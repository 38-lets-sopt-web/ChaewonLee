import React from 'react'
import { button } from './Button.css'

type ButtonProps = {
    children: React.ReactNode
    onClick?: () => void
    type?: 'button' | 'submit'
    className?: string
    disabled?: boolean
}

export default function Button({
    children,
    onClick,
    type = 'button',
    className,
    disabled = false,
}: ButtonProps) {
    return(
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${button} ${className ?? ''}`.trim()}
        >
            {children}
        </button>
    )
}