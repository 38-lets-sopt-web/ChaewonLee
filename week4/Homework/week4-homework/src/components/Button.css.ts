import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'
import { typography } from '../styles/typography.css'

export const button = style({
    ...typography.body,
    width: '480px',
    padding: '8px 16px',
    borderRadius: vars.borderRadius.sm,
    backgroundColor: vars.colors.primary[500],
    color: vars.colors.gray[100],

    ':disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
    },

    ':hover': {
        backgroundColor: vars.colors.primary[600],
        transition: 'all 0.2s ease',
    }
})