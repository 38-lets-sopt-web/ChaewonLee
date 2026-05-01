import styled from '@emotion/styled'

export default function GameBoard({gridSize}) {
    const holes = Array.from({ length: gridSize * gridSize });
    return (
        <BoardContainer gridSize={gridSize}>
            {holes.map((_, index) => (
                <Hole key={index}>
    
                </Hole>
            ))}
        </BoardContainer>

    )
}

const BoardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(${({ gridSize }) => gridSize}, 1fr);
    gap: 16px;
    padding: 4px 24px;
    max-width: 700px;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.colors.bgContent};
    border-radius: ${({theme}) => theme.borderRadius.md};
`

const Hole = styled.div`
    display: flex;
    aspect-ratio: 1 / 1;
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: ${({theme}) => theme.borderRadius.round};
`