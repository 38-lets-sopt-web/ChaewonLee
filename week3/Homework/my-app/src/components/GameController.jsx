import styled from '@emotion/styled'

export default function GameController({ level, setLevel, isPlaying, startGame, stopGame }) {
    return (
        <ControllerContainer>
            <LevelSelect
                value={level}
                onChange={(e) => setLevel(Number(e.target.value))}
                disabled={isPlaying}
            >
                    <option value={1}>Level 1</option>
                    <option value={2}>Level 2</option>
                    <option value={3}>Level 3</option>
            </LevelSelect>
            <BtnGroup>
                <GameBtn onClick={startGame} disabled={isPlaying}>시작</GameBtn>
                <GameBtn onClick={stopGame} disabled={!isPlaying}>중단</GameBtn>
            </BtnGroup>

        </ControllerContainer>
    )
}

const ControllerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
`

const LevelSelect = styled.select`
    padding: 8px 16px;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    border: 2px solid ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.bgContent};
    cursor: pointer;
`

const BtnGroup = styled.div`
    display: flex;
    gap: 16px;
`

const GameBtn = styled.button`
    padding: 4px 16px;
    font-size: ${({theme}) => theme.typography.size.body};
    font-weight: ${({theme}) => theme.typography.weight.regular};
    border-radius: ${({theme}) => theme.borderRadius.md};
    color: ${({theme}) => theme.colors.textMain};
    background-color: ${({ theme }) => theme.colors.secondary};
`