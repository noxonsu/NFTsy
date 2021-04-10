import React from 'react';

import './Button.css';

interface ButtonProps {
    onClick: () => void;
    disabled?: boolean;
    text: string;
    fontSize?: number;
    width?: number;
}
export const Button = ({ onClick, disabled, text, fontSize, width }: ButtonProps) => (
    <div
        className={`Button ${disabled ? 'Button--disabled' : ''}`}
        onClick={disabled ? () => null : onClick}
        style={{ fontSize: `${fontSize}px`, width: `${width}px` }}
    >
        {text}
    </div>
)