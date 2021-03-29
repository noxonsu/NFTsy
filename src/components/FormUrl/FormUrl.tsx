import React, {useState} from "react";

import {ERROR_TOKEN_ID_TEXT, validateTokenId} from "../../utils/validator";

import {FormCustomProps} from "../Form/Form";
import {Button} from "../Button/Button";

import '../Form/Form.css';
import {Input} from "../Input/Input";

export const FormUrl = ({ contractMain, setErrors, setIsDone, currentAccount }: FormCustomProps) => {
    const [tokenId, setTokenId] = useState(undefined as number | undefined);
    const [url, setUrl] = useState('');
    const handleChangeTokenId = (e: React.ChangeEvent<HTMLInputElement>) => setTokenId(+e.target.value || undefined);
    const handleGetUrl = async () => {
        try {
            setErrors([]);
            setIsDone(false);
            const isValidTokenId = validateTokenId(tokenId);

            if (!isValidTokenId) {
                setErrors((errors) => [...errors, ERROR_TOKEN_ID_TEXT]);
            }

            if (currentAccount && isValidTokenId && contractMain) {
                setUrl(await contractMain.methods.tokenURI(tokenId).call());
                setIsDone(true);
            }
        } catch (e) {
            setErrors([e.message]);
        }
    }

    return (
        <div className='Form'>
            <Input title='TokenId' value={tokenId} type='number' onChange={handleChangeTokenId} />
            <Button onClick={handleGetUrl} text='Get URL' disabled={!tokenId} />
            {url && <div className='Form__result-text'>{url}</div>}
        </div>
    );
};
