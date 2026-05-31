import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'
import { typography } from '../styles/typography.css'

export const field = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
})

export const label = style({
    ...typography.caption,
    color: vars.colors.gray[700],
})

export const input = style({
    ...typography.body,
    width: '480px',
    padding: '10px 12px',
    borderRadius: vars.borderRadius.sm,
    border: `1px solid ${vars.colors.gray[300]}`,
    color: vars.colors.gray[700],

    ':focus': {
        border: `1px solid ${vars.colors.primary[400]}`,
    },

    ':disabled': {
        backgroundColor: vars.colors.gray[100],
        cursor: 'not-allowed',
    },
})