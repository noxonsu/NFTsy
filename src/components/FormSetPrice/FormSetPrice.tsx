import React, {useState} from "react";

import {
    ERROR_CONTRACT_TEXT,
    ERROR_PRICE_TEXT, ERROR_TOKEN_ID_TEXT,
    validateTokenId
} from "../../utils/validator";

import { FormCustomProps } from "../FormsContainer/FormsContainer";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

import '../FormsContainer/FormsContainer.css';

export const FormSetPrice = ({ contractSell, setErrors, setIsDone, currentAccount, tokenId, onSuccess }: FormCustomProps) => {
    const [price, setPrice] = useState(undefined as number | undefined);
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
                await contractSell.methods.setCurrentPrice(tokenId, price).send({ from: currentAccount });
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
            <Input title='Price' value={price} type="number" onChange={handleChangePrice} />
            <Button onClick={handleSetPrice} text='Set price' disabled={!price} />
        </div>
    )
};
