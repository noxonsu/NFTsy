import React, {useState} from "react";

import {
    ERROR_PURCHASE_VALUE_TEXT,
    ERROR_TOKEN_ID_TEXT,
    validateTokenId
} from "../../utils/validator";

import {FormCustomProps, Form} from "../Form/Form";

export const FormPurchase = ({ contractSell, tokenId, setErrors, setIsDone, currentAccount }: FormCustomProps) => {
    const [purchaseValue, setPurchaseValue] = useState(undefined as number | undefined);
    const handleChangePurchaseValue = (e: React.ChangeEvent<HTMLInputElement>) => setPurchaseValue(+e.target.value || undefined);
    const handlePurchase = async (e: React.SyntheticEvent) => {
        e.preventDefault();
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
        <Form onSubmit={handlePurchase}>
            <label className="Form__label">
                Value:
                <input className="Form__input" type="number" value={purchaseValue} onChange={handleChangePurchaseValue} />
            </label>
            <input type="submit" className="Form__button" disabled={!purchaseValue} value="Purchase" />
        </Form>
    )
};
