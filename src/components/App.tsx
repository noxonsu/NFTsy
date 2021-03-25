import React, { useState, useEffect } from "react";
import Web3 from 'web3';

import {
    validateUrl, validateTokenId, validateAddress,
    ERROR_TOKEN_ID_TEXT, ERROR_URL_TEXT, ERROR_CONTRACT_TEXT, ERROR_PRICE_TEXT, ERROR_ADDRESS_TEXT, ERROR_PURCHASE_VALUE_TEXT
} from "../utils/validator";
import { CONTRACT_ADDRESS_MAIN, CONTRACT_ADDRESS_SELL } from '../constants/contract';
import CONTRACT_MAIN_ABI from '../constants/mintNFT.json';
import CONTRACT_SELL_ABI from '../constants/sellNFT_CryptoArteSales.json';

import './App.css';

const web3 = new Web3(Web3.givenProvider);

type NumberOrUndef = number | undefined;

let tokenId: number | undefined;
// @ts-ignore
window.init = (initialParams: any) => {
    tokenId = initialParams.tokenId;
}

export const App = () => {
    useEffect(() => {
        // @ts-ignore
        window.ethereum.enable();
        // @ts-ignore
        setCurrentAccount(web3.eth.accounts.currentProvider.selectedAddress.toLowerCase());
    }, []);

    // @ts-ignore
    const contractMain = new web3.eth.Contract(CONTRACT_MAIN_ABI, CONTRACT_ADDRESS_MAIN);
    // @ts-ignore
    const contractSell = new web3.eth.Contract(CONTRACT_SELL_ABI, CONTRACT_ADDRESS_SELL);
    const [currentAccount, setCurrentAccount] = useState(undefined);
    const [errors, setErrors] = useState([] as string[]);
    const [isDone, setIsDone] = useState(false);

    const [url, setUrl] = useState('');
    const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value);
    const handleSubmitMint = async (e: React.SyntheticEvent) => {
        e.preventDefault();
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

            if (currentAccount && isValidTokenId && isValidUrl) {
                await contractMain.methods.mint(currentAccount, tokenId, url).send({ from: currentAccount });
                setIsDone(true);
            }
        } catch (e) {
            setErrors([e.message]);
        }
    };

    const [price, setPrice] = useState(undefined as NumberOrUndef);
    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => setPrice(+e.target.value || undefined);
    const handleSubmitSetPrice = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            setErrors([]);
            setIsDone(false);
            const isValidTokenId = validateTokenId(tokenId);
            const isValidPrice = validateTokenId(price);

            if (!isValidTokenId) {
                setErrors((errors) => [...errors, ERROR_TOKEN_ID_TEXT]);
            }
            if (!isValidPrice) {
                setErrors((errors) => [...errors, ERROR_PRICE_TEXT]);
            }

            if (currentAccount && isValidTokenId && isValidPrice) {
                await contractSell.methods.setCurrentPrice(tokenId, price).send({ from: currentAccount });
                setIsDone(true);
            }
        } catch (e) {
            setErrors([e.message]);
        }
    }

    const [addressToApprove, setAddressToApprove] = useState('');
    const handleChangeAddressToApprove = (e: React.ChangeEvent<HTMLInputElement>) => setAddressToApprove(e.target.value);
    const handleSubmitApprove = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            setErrors([]);
            setIsDone(false);
            const isValidAddressToApprove = validateAddress(addressToApprove);

            if (!isValidAddressToApprove) {
                setErrors((errors) => [...errors, ERROR_ADDRESS_TEXT]);
            }

            if (currentAccount && isValidAddressToApprove) {
                await contractMain.methods.setApprovalForAll(addressToApprove, true).send({ from: currentAccount });
                setIsDone(true);
            }
        } catch (e) {
            setErrors([e.message]);
        }
    }

    const [purchaseValue, setPurchaseValue] = useState(undefined as NumberOrUndef);
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

            if (currentAccount && isValidTokenId && isValidPurchaseValue) {
                await contractSell.methods.purchaseToken(tokenId).send({ from: currentAccount, value: purchaseValue });
                setIsDone(true);
            }
        } catch (e) {
            setErrors([e.message]);
        }
    }

    return (
        <div className="App">
            <header className="App__header">NFT Marketplace</header>
            <div className="App__content">
                <form className="App__form" onSubmit={handleSubmitMint}>
                    <label className="App__form__label">
                        Url:
                        <input className="App__form__input" type="text" value={url} onChange={handleChangeUrl} />
                    </label>
                    <input type="submit" className="App__form__button" disabled={!url} value="Mint" />
                </form>

                <form className="App__form" onSubmit={handleSubmitSetPrice}>
                    <label className="App__form__label">
                        Price:
                        <input className="App__form__input" type="number" value={price} onChange={handleChangePrice} />
                    </label>
                    <input type="submit" className="App__form__button" disabled={!price} value="Set price" />
                </form>

                <form className="App__form" onSubmit={handleSubmitApprove}>
                    <label className="App__form__label">
                        Address:
                        <input className="App__form__input" type="string" value={addressToApprove} onChange={handleChangeAddressToApprove} />
                    </label>
                    <input type="submit" className="App__form__button" disabled={!addressToApprove} value="Approve" />
                </form>

                <form className="App__form" onSubmit={handlePurchase}>
                    <label className="App__form__label">
                        Value:
                        <input className="App__form__input" type="number" value={purchaseValue} onChange={handleChangePurchaseValue} />
                    </label>
                    <input type="submit" className="App__form__button" disabled={!purchaseValue} value="Purchase" />
                </form>
            </div>
            {
                !!errors.length && (
                    <div className="App__errors">
                        {errors.map((error) => (
                            <div key={error} className="App__errors__error">{error}</div>
                        ))}
                    </div>
                )
            }
            { isDone && <div className="App__done">DONE</div> }
        </div>
    );
}
