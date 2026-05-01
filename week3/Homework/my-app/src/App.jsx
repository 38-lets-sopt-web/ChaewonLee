import { ThemeProvider } from '@emotion/react'
import GlobalStyles from './styles/GlobalStyles.jsx'
import { theme } from './styles/theme.js'
import Header from './components/Header.jsx'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
    </ThemeProvider>
  )
}

export default App
