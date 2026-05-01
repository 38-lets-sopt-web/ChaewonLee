import { useState } from 'react'
import { ThemeProvider } from '@emotion/react'
import styled from '@emotion/styled'
import GlobalStyles from './styles/GlobalStyles.jsx'
import { theme } from './styles/theme.js'
import Header from './components/Header.jsx'

function App() {
  const [activeTab, setActiveTab] = useState('game');

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MainLayout>
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <ContentWrapper>
          {activeTab === 'game' ? (
            <div>게임 화면 준비 중!!</div>
          ) : (
            <div>랭킹 화면 준비 중!!</div>
          )}
        </ContentWrapper>
      </MainLayout>
    </ThemeProvider>
  )
}

export default App

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.bgMain};
  gap: 20px;
`;

const ContentWrapper = styled.main `
  display: flex;
  margin-top: 24px;
`