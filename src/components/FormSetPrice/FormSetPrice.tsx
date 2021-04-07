import React, {useEffect, useState} from "react";
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

export const FormSetPrice = ({ contractMain, contractSell, setErrors, setIsDone, currentAccount, tokenId, onSuccess }: FormCustomProps) => {
    const [price, setPrice] = useState(undefined as number | undefined);
    const [isOwner, setIsOwner] = useState(false);
    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => setPrice(+e.target.value || undefined);
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
                await contractSell.methods.setCurrentPrice(tokenId, Web3.utils.toWei(`${price}`)).send({ from: currentAccount });
                if (onSuccess) {
                    onSuccess();
                }
                setIsDone(true);
            }
        } catch (e) {
            setErrors([e.message]);
        }
    };

    useEffect(() => {
        contractMain?.methods.ownerOf(tokenId).call().then((owner: string) => {
            if (owner.toLowerCase() === currentAccount.toLowerCase()) {
                setIsOwner(true);
            } else {
                setIsOwner(false);
            }
        })
    }, [currentAccount, tokenId, contractMain]);
    return (
        <div className='Form'>
            <Input title='Price (ETH)' value={price} type="number" onChange={handleChangePrice} />
            <Button onClick={handleSetPrice} text='Set price' disabled={!price || !isOwner} />
            {!isOwner && (
                <div className="App__title-text">You are not the owner of this NFT</div>
            )}
        </div>
    )
};
