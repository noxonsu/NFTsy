import React, {useState} from "react";

import {
    ERROR_PURCHASE_VALUE_TEXT,
    ERROR_TOKEN_ID_TEXT,
    validateTokenId
} from "../../utils/validator";

import {FormCustomProps} from "../Form/Form";
import {Button} from "../Button/Button";

import '../Form/Form.css';
import {Input} from "../Input/Input";

export const FormPurchase = ({ contractSell, tokenId, setErrors, setIsDone, currentAccount }: FormCustomProps) => {
    const [purchaseValue, setPurchaseValue] = useState(undefined as number | undefined);
    const handleChangePurchaseValue = (e: React.ChangeEvent<HTMLInputElement>) => setPurchaseValue(+e.target.value || undefined);
    const handlePurchase = async () => {
        try {
            setErrors([]);
            setIsDone(false);
            const isValidTokenId = validateTokenId(tokenId);
            const isValidPurchaseValue = validateTokenId(purchaseValue);

            if (!isValidTokenId) {
                setErrors((errors) => [...errors, ERROR_TOKEN_ID_TEXT]);
            }
            if (!isValidPurchaseValue) {
                setErrors((errors) => [...errors, ERROR_PURCHASE_VALUE_TEXT]);
            }

            if (currentAccount && isValidTokenId && isValidPurchaseValue && contractSell) {
                await contractSell.methods.purchaseToken(tokenId).send({ from: currentAccount, value: purchaseValue });
                setIsDone(true);
            }
        } catch (e) {
            setErrors([e.message]);
        }
    }

    return (
        <div className='Form'>
            <Input title='Value' value={purchaseValue} type="number" onChange={handleChangePurchaseValue} />
            <Button onClick={handlePurchase} text='Approve' disabled={!purchaseValue} />
        </div>
    )
};
