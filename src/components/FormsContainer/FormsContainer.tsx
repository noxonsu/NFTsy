import React, {useEffect, useState} from 'react';
import { Contract } from 'web3-eth-contract';

import {FormMint} from "../FormMint/FormMint";
import {FormPurchase} from "../FormPurchase/FormPurchase";
import {FormUrl} from "../FormUrl/FormUrl";

import './FormsContainer.css';
import {Button} from "../Button/Button";
import {FormSetPrice} from "../FormSetPrice/FormSetPrice";

export interface FormCustomProps {
    setErrors: React.Dispatch<React.SetStateAction<string[]>>;
    setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
    contractMain?: Contract;
    contractSell?: Contract;
    tokenId?: number;
    currentAccount: any;
    onSuccess?: () => void;
    currentTokenUrl?: string;
    isOwner?: boolean;
}

export interface FormsContainerProps extends FormCustomProps{
    currentPage: string;
    onChangeCurrentPage: (page: string) => void;
}

const getStepName = (step: number) => {
    switch (step) {
        case 1:
            return 'Step 1: Mint NFT token';
        case 2:
            return 'Step 2: Set Price for created NFT Token';
        default:
            return '';
    }
}

export const FormsContainer = ({ currentPage, onChangeCurrentPage, ...formProps}: FormsContainerProps) => {
    const { contractMain, tokenId, currentAccount } = formProps;
    const [step, setStep] = useState(1);
    const [isOwner, setIsOwner] = useState(false);
    const handleMintSuccess = () => setStep(2);
    const handleSetPriceSuccess = () => setStep(3);

    useEffect(() => {
        contractMain?.methods.tokenURI(tokenId).call().then((url: string) => {
            if (url) {
                setStep(2);
            }
        })
    }, [tokenId, contractMain]);

    useEffect(() => {
        contractMain?.methods.ownerOf(tokenId).call().then((owner: string) => {
            if (owner.toLowerCase() === currentAccount.toLowerCase()) {
                setIsOwner(true);
            } else {
                setIsOwner(false);
            }
        })
    }, [currentAccount, tokenId, contractMain]);

    switch (currentPage) {
        case 'add':
            return (
                <div style={{ textAlign: 'left' }}>
                    <div className='App__title-text'>{getStepName(step)}</div>
                    {
                        step === 1 && <FormMint {...formProps} onSuccess={handleMintSuccess} />
                    }
                    {
                        step === 2 && <FormSetPrice {...formProps} onSuccess={handleSetPriceSuccess} isOwner={isOwner} />
                    }
                    <Button onClick={() => onChangeCurrentPage('view')} text='Go to view page' />
                </div>
            );
        case 'view':
            return (
                <>
                    <FormPurchase {...formProps} />
                    <FormUrl {...formProps} />
                    {isOwner && (
                        <div>
                            <div className='App__title-text'>Set item price in ETH, set 0 if you don't want to sell this item</div>
                            <FormSetPrice {...formProps} isOwner={isOwner} />
                        </div>
                    )}
                </>
            );
        default:
            return null;
    }
};