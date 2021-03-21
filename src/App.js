import React, { useState } from "react";

import { validateAddress, validateUrl, ERROR_ADDRESS_TEXT, ERROR_URL_TEXT } from "./utils/validator";
import './App.css';

export const App = () => {
    const [url, setUrl] = useState('');
    const [address, setAddress] = useState('');
    const handleChangeUrl = (e) => setUrl(e.target.value);
    const handleChangeAddress = (e) => setAddress(e.target.value);
    const [errors, setErrors] = useState([]);
    const handleSubmit = () => {
        setErrors([]);
        const isValidAddress = validateAddress(address);
        const isValidUrl = validateUrl(url);

        if (!isValidAddress) {
            console.log('isValidAddress');
            setErrors((errors) => [...errors, ERROR_ADDRESS_TEXT]);
        }
        if (!isValidUrl) {
            console.log('isValidUrl');
            setErrors((errors) => [...errors, ERROR_URL_TEXT]);
        }

        if (isValidAddress && isValidUrl) {
            console.log('SUBMIT');
        }
    };

    return (
        <div className="App">
            <header className="App__header">NFT Marketplace</header>
            <div className="App__content">
                <label className="App__content__label">
                    Address:
                    <input className="App__content__input" type="text" value={address} onChange={handleChangeAddress} />
                </label>
                <label className="App__content__label">
                    Url:
                    <input className="App__content__input" type="text" value={url} onChange={handleChangeUrl} />
                </label>
                <button className="App__content__button" disabled={!address || !url} onClick={handleSubmit}>
                    Mint
                </button>
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
        </div>
    );
}
