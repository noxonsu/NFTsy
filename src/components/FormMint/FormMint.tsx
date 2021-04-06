import React, {useState} from "react";

import {
    ERROR_CONTRACT_TEXT,
    ERROR_TOKEN_ID_TEXT,
    ERROR_URL_TEXT,
    validateTokenId,
    validateUrl
} from "../../utils/validator";

import { FormCustomProps } from "../FormsContainer/FormsContainer";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { CONTRACT_ADDRESS_SELL } from "../../constants/contract";

import '../FormsContainer/FormsContainer.css';

export const FormMint = ({ contractMain, setErrors, setIsDone, currentAccount, tokenId, onSuccess }: FormCustomProps) => {
    const [url, setUrl] = useState('');
    const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value);
    const handleSubmitMint = async () => {
        try {
            setErrors([]);
            setIsDone(false);
            const isValidUrl = validateUrl(url);
            const isValidTokenId = validateTokenId(tokenId);

            if (!isValidUrl) {
                setErrors((errors) => [...errors, ERROR_URL_TEXT]);
            }
            if (!isValidTokenId) {
                setErrors((errors) => [...errors, ERROR_TOKEN_ID_TEXT]);
            }
            if (!currentAccount) {
                setErrors((errors) => [...errors, ERROR_CONTRACT_TEXT]);
            }

            if (currentAccount && isValidTokenId && isValidUrl && contractMain) {
                await contractMain.methods.mintAndApprove(currentAccount, tokenId, url, CONTRACT_ADDRESS_SELL).send({ from: currentAccount });
                if (onSuccess) {
                    onSuccess();
                }
                setIsDone(true);
            }
        } catch (e) {
            setErrors([e.message]);
        }
    };
    return (
        <div className='Form'>
            <Input title='Url' value={url} type="text" onChange={handleChangeUrl} />
            <Button onClick={handleSubmitMint} text='Mint' disabled={!url} />
        </div>
    )
};
