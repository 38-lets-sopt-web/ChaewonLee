import { style } from '@vanilla-extract/css'

export const userInfoContainer = style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    gap: '32px',
})

export const editableSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
})
