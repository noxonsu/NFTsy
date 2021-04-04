import React from 'react';
import { Contract } from 'web3-eth-contract';

import {FormMint} from "../FormMint/FormMint";
import {FormPurchase} from "../FormPurchase/FormPurchase";
import {FormUrl} from "../FormUrl/FormUrl";

import './FormsContainer.css';
import {Button} from "../Button/Button";

export interface FormCustomProps {
    setErrors: React.Dispatch<React.SetStateAction<string[]>>;
    setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
    contractMain?: Contract;
    contractSell?: Contract;
    tokenId?: number;
    currentAccount: any;
}

export interface FormsContainerProps extends FormCustomProps{
    currentPage: string;
    onChangeCurrentPage: (page: string) => void;
}

export const FormsContainer = ({ currentPage, onChangeCurrentPage, ...formProps}: FormsContainerProps) => {
    switch (currentPage) {
        case 'init':
            return (
                <div style={{ textAlign: 'left' }}>
                    <FormMint {...formProps} />
                    <Button onClick={() => onChangeCurrentPage('view')} text='Go to view page' />
                </div>
            );
        case 'view':
            return (
                <>
                    <FormPurchase {...formProps} />
                    <FormUrl {...formProps} />
                </>
            );
        default:
            return null;
    }
};