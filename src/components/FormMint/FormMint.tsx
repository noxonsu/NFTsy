import React, {useState} from "react";

import {
    ERROR_CONTRACT_TEXT,
    ERROR_PRICE_TEXT, ERROR_TOKEN_ID_TEXT,
    ERROR_URL_TEXT,
    validateTokenId,
    validateUrl
} from "../../utils/validator";

import {Form, FormCustomProps} from "../Form/Form";

export const FormMint = ({ contractMain, contractSell, setErrors, setIsDone, currentAccount, tokenId }: FormCustomProps) => {
    const [url, setUrl] = useState('');
    const [price, setPrice] = useState(undefined as number | undefined);
    const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value);
    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => setPrice(+e.target.value || undefined);
    const handleSubmitMint = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            setErrors([]);
            setIsDone(false);
            const isValidUrl = validateUrl(url);
            const isValidTokenId = validateTokenId(tokenId);
            const isValidPrice = validateTokenId(price);

            if (!isValidUrl) {
                setErrors((errors) => [...errors, ERROR_URL_TEXT]);
            }
            if (!isValidPrice) {
                setErrors((errors) => [...errors, ERROR_PRICE_TEXT]);
            }
            if (!isValidTokenId) {
                setErrors((errors) => [...errors, ERROR_TOKEN_ID_TEXT]);
            }
            if (!currentAccount) {
                setErrors((errors) => [...errors, ERROR_CONTRACT_TEXT]);
            }

            if (currentAccount && isValidTokenId && isValidUrl && contractMain && contractSell) {
                await contractMain.methods.mint(currentAccount, tokenId, url).send({ from: currentAccount });
                await contractSell.methods.setCurrentPrice(tokenId, price).send({ from: currentAccount });
                setIsDone(true);
            }
        } catch (e) {
            setErrors([e.message]);
        }
    };
    return (
        <Form onSubmit={handleSubmitMint}>
            <label className="Form__label">
                Url:
                <input className="Form__input" type="text" value={url} onChange={handleChangeUrl} />
            </label>
            <label className="Form__label">
                Price:
                <input className="Form__input" type="number" value={price} onChange={handleChangePrice} />
            </label>
            <input type="submit" className="Form__button" disabled={!url || !price} value="Mint" />
        </Form>
    )
};
