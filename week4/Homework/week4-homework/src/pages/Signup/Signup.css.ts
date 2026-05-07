import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

export const wrapper = style({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '32px'
})

export const loginLink = style({
    color: vars.colors.primary[500],
})