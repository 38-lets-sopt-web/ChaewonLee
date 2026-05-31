import styled from '@emotion/styled'

export default function Header ({activeTab, setActiveTab}) {
    return (
        <HeaderContainer>
            <Title>두더지 게임</Title>
            <Tabs>
                <Tab
                    isActive={activeTab==='game'}
                    onClick={() => setActiveTab('game')}
                >
                    게임
                </Tab>
                <Tab
                    isActive={activeTab === 'ranking'}
                    onClick={() => setActiveTab('ranking')}    
                >
                    랭킹
                </Tab>
            </Tabs>
        </HeaderContainer>

    )

}

const HeaderContainer = styled.header `
    display: flex;
    align-items: center;
    padding: 16px;
    gap: 16px;
    border-radius: ${({theme}) => theme.borderRadius.md};
    background-color: ${({ theme }) => theme.colors.bgCard};
`

const Title = styled.h1 `
    font-size: ${({theme}) => theme.typography.size.title};
    font-weight: ${({theme}) => theme.typography.weight.bold};
    color: ${({theme}) => theme.colors.textMain};
`

const Tabs = styled.div `
    display: flex;
    gap: 12px;
`

const Tab = styled.button `
    padding: 4px 16px;
    font-size: ${({theme}) => theme.typography.size.body};
    font-weight: ${({theme}) => theme.typography.weight.regular};
    color: ${({theme}) => theme.colors.textMain};
    border: 1.5px solid ${({ theme }) => theme.colors.secondary};
    border-radius: ${({theme}) => theme.borderRadius.md};
    background-color: ${({ isActive, theme }) => 
        isActive ? theme.colors.secondary : 'transparent'};
    &:hover {
        background-color: ${({ theme }) => theme.colors.secondary };
    }
`