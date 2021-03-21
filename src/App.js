import React, { useState } from "react";

import { validateAddress, validateUrl, ERROR_ADDRESS_TEXT, ERROR_URL_TEXT } from "./utils/validator";
import './App.css';

export const App = () => {
    const [url, setUrl] = useState('');
    const [address, setAddress] = useState('');
    const [errors, setErrors] = useState([]);

    const handleChangeUrl = (e) => setUrl(e.target.value);
    const handleChangeAddress = (e) => setAddress(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
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
                <form className="App__form" onSubmit={handleSubmit}>
                    <label className="App__form__label">
                        Address:
                        <input className="App__form__input" type="text" value={address} onChange={handleChangeAddress} />
                    </label>
                    <label className="App__form__label">
                        Url:
                        <input className="App__form__input" type="text" value={url} onChange={handleChangeUrl} />
                    </label>
                    <input type="submit" className="App__form__button" disabled={!address || !url} value="Mint" />
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
        </div>
    );
}
