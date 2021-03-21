import React, { useState, useEffect } from "react";
import Web3 from 'web3';

import {
    validateAddress, validateUrl, validateTokenId,
    ERROR_ADDRESS_TEXT, ERROR_TOKEN_ID_TEXT, ERROR_URL_TEXT, ERROR_CONTRACT_TEXT
} from "../utils/validator";
import { CONTRACT_ADDRESS } from '../constants/contract';
import CONTRACT_ABI from '../constants/mintNFT.json';

import './App.css';

const web3 = new Web3(Web3.givenProvider);

export const App = () => {
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    const [currentAccount, setCurrentAccount] = useState(undefined);
    useEffect(() => {
        window.ethereum.enable();
        setCurrentAccount(web3.eth.accounts.currentProvider.selectedAddress.toLowerCase());
    }, []);

    const [url, setUrl] = useState('');
    const [address, setAddress] = useState('');
    const [tokenId, setTokenId] = useState(null);
    const [errors, setErrors] = useState([]);
    const [isDone, setIsDone] = useState(false);

    const handleChangeAddress = (e) => setAddress(e.target.value);
    const handleChangeTokenId = (e) => setTokenId(+e.target.value || null);
    const handleChangeUrl = (e) => setUrl(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setErrors([]);
            setIsDone(false);
            const isValidAddress = validateAddress(address);
            const isValidUrl = validateUrl(url);
            const isValidTokenId = validateTokenId(tokenId);

            if (!isValidAddress) {
                setErrors((errors) => [...errors, ERROR_ADDRESS_TEXT]);
            }
            if (!isValidUrl) {
                setErrors((errors) => [...errors, ERROR_URL_TEXT]);
            }
            if (!isValidTokenId) {
                setErrors((errors) => [...errors, ERROR_TOKEN_ID_TEXT]);
            }
            if (!currentAccount) {
                setErrors((errors) => [...errors, ERROR_CONTRACT_TEXT]);
            }

            if (isValidAddress && isValidTokenId && isValidUrl) {
                await contract.methods.mint(address, tokenId, url).send({ from: currentAccount });
                setIsDone(true);
            }
        } catch (e) {
            setErrors([e.message]);
        }

    };

    return (
        <div className="App">
            <header className="App__header">NFT Marketplace</header>
            <div className="App__content">
                <form className="App__form" onSubmit={handleSubmit}>
                    <label className="App__form__label">
                        Address:
                        <input className="App__form__input" type="text" value={address} onChange={handleChangeAddress} />
                    </label>
                    <label className="App__form__label">
                        TokenId:
                        <input className="App__form__input" type="number" value={tokenId} onChange={handleChangeTokenId} />
                    </label>
                    <label className="App__form__label">
                        Url:
                        <input className="App__form__input" type="text" value={url} onChange={handleChangeUrl} />
                    </label>
                    <input type="submit" className="App__form__button" disabled={!address || !tokenId || !url } value="Mint" />
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
