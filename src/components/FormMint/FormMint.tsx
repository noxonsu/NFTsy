import React, {useEffect, useState} from "react";

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

export const FormMint = ({ contractMain, setErrors, setIsDone, currentAccount, tokenId, onSuccess, currentTokenUrl }: FormCustomProps) => {
    const [url, setUrl] = useState('');
    const [isInProgress, setIsInProgress] = useState(false);
    const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value);
    const handleSubmitMint = async (newUrl?: string) => {
        try {
            setErrors([]);
            setIsDone(false);
            const isValidTokenId = validateTokenId(tokenId);

            if (!isValidTokenId) {
                setErrors((errors) => [...errors, ERROR_TOKEN_ID_TEXT]);
            }
            if (!currentAccount) {
                setErrors((errors) => [...errors, ERROR_CONTRACT_TEXT]);
            }

            if (currentAccount && isValidTokenId && contractMain && (newUrl ?? url)) {
                setIsInProgress(true);
                await contractMain.methods.mintAndApprove(currentAccount, tokenId, newUrl ?? url, CONTRACT_ADDRESS_SELL).send({ from: currentAccount });
                if (onSuccess) {
                    onSuccess();
                }
                setIsInProgress(false);
                setIsDone(true);
            }
        } catch (e) {
            setIsInProgress(false);
            setErrors([e.message]);
        }
    };

    useEffect(() => {
        if (currentTokenUrl) {
            setUrl(currentTokenUrl);
            handleSubmitMint(currentTokenUrl);
        }
    }, [currentTokenUrl]);

    return (
        <div className='Form'>
            <Input title='Url' value={url} type="text" onChange={handleChangeUrl} />
            <Button onClick={() => handleSubmitMint()} text={isInProgress ? 'Pending...' : 'Mint'} disabled={!url || isInProgress} />
        </div>
    )
};
