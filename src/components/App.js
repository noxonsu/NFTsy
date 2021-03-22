import React, { useState, useEffect } from "react";
import Web3 from 'web3';

import {
    validateUrl, validateTokenId, validateAddress,
    ERROR_TOKEN_ID_TEXT, ERROR_URL_TEXT, ERROR_CONTRACT_TEXT, ERROR_PRICE_TEXT, ERROR_ADDRESS_TEXT
} from "../utils/validator";
import { CONTRACT_ADDRESS_MAIN, CONTRACT_ADDRESS_SELL } from '../constants/contract';
import CONTRACT_MAIN_ABI from '../constants/mintNFT.json';
import CONTRACT_SELL_ABI from '../constants/sellNFT_CryptoArteSales.json';

import './App.css';

const web3 = new Web3(Web3.givenProvider);

export const App = () => {
    useEffect(() => {
        window.ethereum.enable();
        setCurrentAccount(web3.eth.accounts.currentProvider.selectedAddress.toLowerCase());
    }, []);

    const contractMain = new web3.eth.Contract(CONTRACT_MAIN_ABI, CONTRACT_ADDRESS_MAIN);
    const [currentAccount, setCurrentAccount] = useState(undefined);
    const [url, setUrl] = useState('');
    const [tokenId, setTokenId] = useState(null);
    const [errors, setErrors] = useState([]);
    const [isDone, setIsDone] = useState(false);

    const handleChangeTokenId = (e) => setTokenId(+e.target.value || null);
    const handleChangeUrl = (e) => setUrl(e.target.value);

    const handleSubmitMint = async (e) => {
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

    const contractSell = new web3.eth.Contract(CONTRACT_SELL_ABI, CONTRACT_ADDRESS_SELL);
    const [tokenIdPrice, setTokenIdPrice] = useState(null);
    const [price, setPrice] = useState(null);

    const handleChangePrice = (e) => setPrice(+e.target.value || null);
    const handleChangeTokenIdPrice = (e) => setTokenIdPrice(+e.target.value || null);

    const handleSubmitSetPrice = async (e) => {
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
    const handleChangeAddressToApprove = (e) => setAddressToApprove(e.target.value);
    const handleSubmitApprove = async (e) => {
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
