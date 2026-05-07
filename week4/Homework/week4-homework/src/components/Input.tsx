import React from 'react'
import { field, label, input } from './Input.css'

type InputProps = {
    label?: string
    type?: 'text' | 'password' | 'email' | 'number'
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    className?: string
    name?: string
}

export default function Input({
    label: labelText,
    type = 'text',
    value,
    onChange,
    placeholder,
    className,
    name,
    }: InputProps) {
    return (
        <div className={field}>
        {labelText && <label className={label}>{labelText}</label>}

        <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${input} ${className ?? ''}`.trim()}
        />
        </div>
    )
}