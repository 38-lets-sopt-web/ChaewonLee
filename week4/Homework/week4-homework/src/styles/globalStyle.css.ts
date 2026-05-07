import { globalStyle } from '@vanilla-extract/css'

globalStyle('*', {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box'
})

globalStyle('body', {
    backgroundColor: '#FFE3EA',
})

globalStyle('button', {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
})

globalStyle('ol, ul, li', {
    listStyle: 'none',
})

globalStyle('input', {
    border: 'none',
    outline: 'none',
})

globalStyle('button, input, textarea', {
    font: 'inherit',
})