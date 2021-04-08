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
    const [isInProgress, setIsInProgress] = useState(false);
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
                setIsInProgress(true);
                await contractSell.methods.purchaseToken(tokenId).send({
                    from: currentAccount,
                    value: Web3.utils.toWei(`${purchaseValue}`)
                });
                setIsInProgress(false);
                setIsDone(true);
            }
        } catch (e) {
            setIsInProgress(false);
            setErrors([e.message]);
        }
    }

    useEffect(() => {
        try {
            contractSell?.methods.nft_prices(tokenId).call().then((res: number) => {
                setPurchaseValue(+Web3.utils.fromWei(`${res}`));
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
            <div className='App__title-text'>Price: {purchaseValue} ETH</div>
            <Button onClick={handlePurchase} text={isInProgress ? 'Pending...' : 'Purchase'} disabled={!isPriceInstalled || isInProgress} />
            {!isPriceInstalled && <div className='Form__text'>This item not for sale</div>}
        </div>
    )
};
