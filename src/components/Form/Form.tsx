import React from 'react';
import { Contract } from 'web3-eth-contract';

import './Form.css';

export interface FormCustomProps {
    setErrors: React.Dispatch<React.SetStateAction<string[]>>;
    setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
    contractMain?: Contract;
    contractSell?: Contract;
    tokenId?: number;
    currentAccount: any;
}

interface FormProps {
    onSubmit: (e: React.SyntheticEvent) => void;
    children: React.ReactNode;
}
export const Form = ({ children, onSubmit }: FormProps) => (
    <form className="Form" onSubmit={onSubmit}>
        {children}
    </form>
)
