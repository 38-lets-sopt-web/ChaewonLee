import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const card = style({
    display: 'flex',
    flexDirection: 'column',
    width: '180px',
    gap: '16px',
    padding: '32px',
    backgroundColor: vars.colors.primary[200],
    borderRadius: vars.borderRadius.sm
})

export const name = style({
    color: vars.colors.gray[500],
})

export const part = style({
    color: vars.colors.gray[500],
})