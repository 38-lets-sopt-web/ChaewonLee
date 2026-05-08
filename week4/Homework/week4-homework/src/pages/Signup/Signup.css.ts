import { style } from '@vanilla-extract/css'

export const wrapper = style({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '32px'
})