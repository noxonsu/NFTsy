import React, {useEffect, useState} from "react";

import {
    ERROR_PURCHASE_VALUE_TEXT,
    ERROR_TOKEN_ID_TEXT,
    validateTokenId
} from "../../utils/validator";

import {FormCustomProps} from "../FormsContainer/FormsContainer";
import {Button} from "../Button/Button";

import '../FormsContainer/FormsContainer.css';
import Web3 from "web3";

export const FormPurchase = ({ contractMain, contractSell, tokenId, setErrors, setIsDone, currentAccount, title }: FormCustomProps) => {
    const [purchaseValue, setPurchaseValue] = useState(undefined as number | undefined);
    const [isPriceInstalled, setIsPriceInstalled] = useState(false);
    const [isInProgress, setIsInProgress] = useState(false);
    const [url, setUrl] = useState('');
    const [showText, setShowText] = useState(false);
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
            if (contractMain) {
                contractMain.methods.tokenURI(tokenId).call().then((res: string) => setUrl(res));
            }
        } catch (e) {
            setErrors([e.message]);
        }
    }, [tokenId]);

    return (
        <div className='Form Form-extended'>
            <div className='Form__container'>
                <div className='Form__image'>
                    {
                        url && (
                            showText
                                ? <div className='Form__result-text'>{url}</div>
                                : <img className='Form__image-preview' src={url} alt={url} onError={() => setShowText(true)} />
                        )
                    }
                </div>
                <div className='Form__info'>
                    {title && <div className='Form__info__title'>{title}</div>}
                    <div>
                        <div className='Form__price'>{purchaseValue} <span className='Form__price__currency'>ETH</span></div>
                        {!isPriceInstalled && <div className='Form__info__warning'>This item not for sale</div>}
                        <Button fontSize={20} onClick={handlePurchase} text={isInProgress ? 'Pending...' : 'Purchase'} disabled={!isPriceInstalled || isInProgress} />
                    </div>
                </div>
            </div>
        </div>
    );
};
