import React from 'react';

import './Input.css';

interface InputProps {
    title: string;
    value: any;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ title, onChange, value, type }: InputProps) => (
    <div className='Input'>
        <div className='Input__title'>{title}</div>
        <input className='Input__input' value={value} onChange={onChange} type={type} />
    </div>
)