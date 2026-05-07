import { createTheme } from '@vanilla-extract/css'

export const [ themeClass, vars ] = createTheme({
    colors: {
        primary: {
            100: '#FFE3EA',
            200: '#FFC9D6',
            300: '#FFADC2',
            400: '#FF8DAA',
            500: '#FF6B93',
            600: '#F14E7B',
            700: '#D63363',
            800: '#B82652',
            900: '#8F1D40',
        },

        gray: {
            100: '#F5F5F7',
            200: '#EBEBEF',
            300: '#DCDCE3',
            400: '#B9BBC6',
            500: '#8F93A3',
            600: '#6B7280',
            700: '#4B5563',
            800: '#374151',
            900: '#111827',
        },
    },

    font: {
        size: {
            sm: '14px',
            md: '16px',
            lg: '18px',
        },

        weight: {
            regular: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
        },

        lineHeight: {
            tight: '1.2',
            normal: '1.5',
            relaxed: '1.625',
        },
    },

})