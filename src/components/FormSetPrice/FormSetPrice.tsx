import React, {useState} from "react";
import Web3 from 'web3';

import {
    ERROR_CONTRACT_TEXT,
    ERROR_PRICE_TEXT, ERROR_TOKEN_ID_TEXT,
    validateTokenId
} from "../../utils/validator";

import { FormCustomProps } from "../FormsContainer/FormsContainer";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

import '../FormsContainer/FormsContainer.css';

export const FormSetPrice = ({ isOwner, contractSell, setErrors, setIsDone, currentAccount, tokenId, onSuccess }: FormCustomProps) => {
    const [price, setPrice] = useState(undefined as number | undefined);
    const [isInProgress, setIsInProgress] = useState(false);
    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value === '' ? undefined : +e.target.value);
    const handleSetPrice = async () => {
        try {
            setErrors([]);
            setIsDone(false);
            const isValidTokenId = validateTokenId(tokenId);
            const isValidPrice = validateTokenId(price);

            if (!isValidPrice) {
                setErrors((errors) => [...errors, ERROR_PRICE_TEXT]);
            }
            if (!isValidTokenId) {
                setErrors((errors) => [...errors, ERROR_TOKEN_ID_TEXT]);
            }
            if (!currentAccount) {
                setErrors((errors) => [...errors, ERROR_CONTRACT_TEXT]);
            }

            if (currentAccount && isValidTokenId && contractSell) {
                setIsInProgress(true);
                await contractSell.methods.setCurrentPrice(tokenId, Web3.utils.toWei(`${price}`)).send({ from: currentAccount });
                setIsInProgress(false);
                if (onSuccess) {
                    onSuccess();
                }
                setIsDone(true);
            }
        } catch (e) {
            setIsInProgress(false);
            setErrors([e.message]);
        }
    };

    return (
        <div className='Form'>
            <div className='Form__title'>Set item price in ETH, set 0 if you don't want to sell this item</div>
            <Input title='Price (ETH)' value={price} type="number" onChange={handleChangePrice} />
            <Button onClick={handleSetPrice} text={isInProgress ? 'Pending...' : 'Set price'} disabled={price === undefined || !isOwner || isInProgress} />
            {!isOwner && (
                <div className="App__title-text">You are not the owner of this NFT</div>
            )}
        </div>
    )
};
