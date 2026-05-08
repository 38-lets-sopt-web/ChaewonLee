import React from 'react'
import { button, ghostButton } from './Button.css'

type ButtonVariant = 'primary' | 'ghost'

type ButtonProps = {
    children: React.ReactNode
    onClick?: () => void
    type?: 'button' | 'submit'
    className?: string
    disabled?: boolean
    variant?: ButtonVariant
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: button,
    ghost: ghostButton,
}

export default function Button({
    children,
    onClick,
    type = 'button',
    className,
    disabled = false,
    variant = 'primary',
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${variantStyles[variant]} ${className ?? ''}`.trim()}
        >
            {children}
        </button>
    )
}