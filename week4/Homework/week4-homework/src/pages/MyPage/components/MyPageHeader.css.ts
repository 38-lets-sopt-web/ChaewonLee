import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'
import { typography } from '@/styles/typography.css'

export const header = style({
    display: 'flex',
    backgroundColor: vars.colors.primary[500],
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
})

export const userSection = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: vars.colors.gray[100],
})

export const userTitle = style({
    ...typography.title
})

export const userName = style({
    ...typography.body
})

export const navSection = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
})

export const navItem = style({
    color: vars.colors.gray[100],
})

