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
    const [tokenId, setTokenId] = useState(undefined as NumberOrUndef);

    const handleChangeTokenId = (e: React.ChangeEvent<HTMLInputElement>) => setTokenId(+e.target.value || undefined);
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

    const [tokenIdPrice, setTokenIdPrice] = useState(undefined as NumberOrUndef);
    const [price, setPrice] = useState(undefined as NumberOrUndef);

    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => setPrice(+e.target.value || undefined);
    const handleChangeTokenIdPrice = (e: React.ChangeEvent<HTMLInputElement>) => setTokenIdPrice(+e.target.value || undefined);

    const handleSubmitSetPrice = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            setErrors([]);
            setIsDone(false);
            const isValidTokenIdPrice = validateTokenId(tokenIdPrice);
            const isValidPrice = validateTokenId(price);

            if (!isValidTokenIdPrice) {
                setErrors((errors) => [...errors, ERROR_TOKEN_ID_TEXT]);
            }
            if (!isValidPrice) {
                setErrors((errors) => [...errors, ERROR_PRICE_TEXT]);
            }

            if (currentAccount && isValidTokenIdPrice && isValidPrice) {
                await contractSell.methods.setCurrentPrice(tokenIdPrice, price).send({ from: currentAccount });
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

    const [purchaseTokenId, setPurchaseTokenId] = useState(undefined as NumberOrUndef);
    const [purchaseValue, setPurchaseValue] = useState(undefined as NumberOrUndef);
    const handleChangePurchaseTokenId = (e: React.ChangeEvent<HTMLInputElement>) => setPurchaseTokenId(+e.target.value || undefined);
    const handleChangePurchaseValue = (e: React.ChangeEvent<HTMLInputElement>) => setPurchaseValue(+e.target.value || undefined);
    const handlePurchase = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            setErrors([]);
            setIsDone(false);
            const isValidPurchaseTokenId = validateTokenId(purchaseTokenId);
            const isValidPurchaseValue = validateTokenId(purchaseValue);

            if (!isValidPurchaseTokenId) {
                setErrors((errors) => [...errors, ERROR_TOKEN_ID_TEXT]);
            }
            if (!isValidPurchaseValue) {
                setErrors((errors) => [...errors, ERROR_PURCHASE_VALUE_TEXT]);
            }

            if (currentAccount && isValidPurchaseTokenId && isValidPurchaseValue) {
                await contractSell.methods.purchaseToken(purchaseTokenId).send({ from: currentAccount, value: purchaseValue });
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
                        TokenId:
                        <input className="App__form__input" type="number" value={tokenId} onChange={handleChangeTokenId} />
                    </label>
                    <label className="App__form__label">
                        Url:
                        <input className="App__form__input" type="text" value={url} onChange={handleChangeUrl} />
                    </label>
                    <input type="submit" className="App__form__button" disabled={!tokenId || !url} value="Mint" />
                </form>

                <form className="App__form" onSubmit={handleSubmitSetPrice}>
                    <label className="App__form__label">
                        TokenId:
                        <input className="App__form__input" type="number" value={tokenIdPrice} onChange={handleChangeTokenIdPrice} />
                    </label>
                    <label className="App__form__label">
                        Price:
                        <input className="App__form__input" type="number" value={price} onChange={handleChangePrice} />
                    </label>
                    <input type="submit" className="App__form__button" disabled={!tokenIdPrice || !price} value="Set price" />
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
                        TokenId:
                        <input className="App__form__input" type="number" value={purchaseTokenId} onChange={handleChangePurchaseTokenId} />
                    </label>
                    <label className="App__form__label">
                        Value:
                        <input className="App__form__input" type="number" value={purchaseValue} onChange={handleChangePurchaseValue} />
                    </label>
                    <input type="submit" className="App__form__button" disabled={!purchaseTokenId || !purchaseValue} value="Purchase" />
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
