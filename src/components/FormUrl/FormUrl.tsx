import React, {useState} from "react";

import {ERROR_TOKEN_ID_TEXT, validateTokenId} from "../../utils/validator";

import {FormCustomProps} from "../FormsContainer/FormsContainer";
import {Button} from "../Button/Button";

import '../FormsContainer/FormsContainer.css';
import {Input} from "../Input/Input";

export const FormUrl = ({ contractMain, setErrors, setIsDone, currentAccount, tokenId }: FormCustomProps) => {
    const [tokenIdInput, setTokenId] = useState(tokenId);
    const [url, setUrl] = useState('');
    const [showText, setShowText] = useState(false);
    const handleChangeTokenId = (e: React.ChangeEvent<HTMLInputElement>) => setTokenId(+e.target.value || undefined);
    const handleGetUrl = async () => {
        try {
            setUrl('');
            setShowText(false);
            setErrors([]);
            setIsDone(false);
            const isValidTokenId = validateTokenId(tokenIdInput);

            if (!isValidTokenId) {
                setErrors((errors) => [...errors, ERROR_TOKEN_ID_TEXT]);
            }

            if (currentAccount && isValidTokenId && contractMain) {
                setUrl(await contractMain.methods.tokenURI(tokenIdInput).call());
                setIsDone(true);
            }
        } catch (e) {
            setUrl('');
            setShowText(false);
            setErrors([e.message]);
            setIsDone(false);
        }
    }

    return (
        <div className='Form'>
            <Input title='TokenId' value={tokenIdInput} type='number' onChange={handleChangeTokenId} />
            <Button onClick={handleGetUrl} text='Get URL' disabled={!tokenIdInput} />
            {
                url && (
                    showText
                        ? <div className='Form__result-text'>{url}</div>
                        : <img className='Form__image-preview' src={url} alt={url} onError={() => setShowText(true)} />
                )
            }
        </div>
    );
};
