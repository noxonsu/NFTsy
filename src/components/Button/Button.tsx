import React from 'react';

import './Button.css';

interface ButtonProps {
    onClick: () => void;
    disabled?: boolean;
    text: string;
}
export const Button = ({ onClick, disabled, text }: ButtonProps) => (
    <div className={`Button ${disabled ? 'Button--disabled' : ''}`} onClick={disabled ? () => null : onClick}>
        {text}
    </div>
)