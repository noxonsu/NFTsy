import React from 'react';

import './Button.css';

interface ButtonProps {
    onClick: () => void;
    disabled?: boolean;
    text: string;
    fontSize?: number;
}
export const Button = ({ onClick, disabled, text, fontSize }: ButtonProps) => (
    <div
        className={`Button ${disabled ? 'Button--disabled' : ''}`}
        onClick={disabled ? () => null : onClick}
        style={{ fontSize }}
    >
        {text}
    </div>
)