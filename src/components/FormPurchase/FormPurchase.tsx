import React, {useEffect, useState} from "react";

import {
    ERROR_PURCHASE_VALUE_TEXT,
    ERROR_TOKEN_ID_TEXT,
    validateTokenId
} from "../../utils/validator";

import {FormCustomProps} from "../FormsContainer/FormsContainer";
import {Button} from "../Button/Button";

import '../FormsContainer/FormsContainer.css';
import {Input} from "../Input/Input";
import Web3 from "web3";

export const FormPurchase = ({ contractSell, tokenId, setErrors, setIsDone, currentAccount }: FormCustomProps) => {
    const [purchaseValue, setPurchaseValue] = useState(undefined as number | undefined);
    const [isPriceInstalled, setIsPriceInstalled] = useState(false);
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
                await contractSell.methods.purchaseToken(tokenId).send({
                    from: currentAccount,
                    value: Web3.utils.toWei(`${purchaseValue}`)
                });
                setIsDone(true);
            }
        } catch (e) {
            setErrors([e.message]);
        }
    }

    useEffect(() => {
        try {
            contractSell?.methods.nft_prices(tokenId).call().then((res: number) => {
                if (res > 0) {
                    setIsPriceInstalled(true);
                } else {
                    setIsPriceInstalled(false);
                }
            });
        } catch (e) {
            setErrors([e.message]);
        }
    }, [tokenId]);

    return (
        <div className='Form'>
            <Input title='Value (ETH)' value={purchaseValue} type="number" onChange={handleChangePurchaseValue} />
            <Button onClick={handlePurchase} text='Purchase' disabled={!purchaseValue || !isPriceInstalled} />
            {!isPriceInstalled && <div className='Form__text'>This item not for sale</div>}
        </div>
    )
};
