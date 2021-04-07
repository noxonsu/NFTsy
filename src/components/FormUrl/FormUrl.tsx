import React, {useEffect, useState} from "react";

import {FormCustomProps} from "../FormsContainer/FormsContainer";

import '../FormsContainer/FormsContainer.css';

export const FormUrl = ({ contractMain, setErrors, tokenId }: FormCustomProps) => {
    const [url, setUrl] = useState('');
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        try {
            if (contractMain) {
                contractMain.methods.tokenURI(tokenId).call().then((res: string) => setUrl(res));
            }
        } catch (e) {
            setErrors([e.message]);
        }
    }, [contractMain, tokenId]);

    return (
        <div className='Form'>
            <div className='App__title-text'>Image in token:</div>
            {
                url && (
                    showText
                        ? <div className='Form__result-text'>{url}</div>
                        : <img className='Form__image-preview' src={url} alt={url} onError={() => setShowText(true)} />
                )
            }
        </div>
    );
};
