import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'
import { typography } from '@/styles/typography.css'

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '100px',
    gap: '32px',
})

export const readOnlySection = style({
    display: 'flex',
    flexDirection: 'column',
    width: '480px',
    padding: '16px',
    gap: '16px',
    backgroundColor: vars.colors.primary[200],
    borderRadius: vars.borderRadius.sm,
})

export const infoItem = style({
    display: 'flex',
    justifyContent: 'space-between'
})

export const infoLabel = style({
    ...typography.title,
    color: vars.colors.primary[600]
})

export const infoText = style({
    ...typography.body,
    color: vars.colors.primary[500]
})