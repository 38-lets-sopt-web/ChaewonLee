import styled from '@emotion/styled'
import moleImg from '../assets/mole.png';
import bombImg from '../assets/bomb.png';
import hitImg from '../assets/hit.png';

export default function GameBoard({ gridSize, activeHoles, onHoleClick }) {
    const holes = Array.from({ length: gridSize * gridSize });
    return (
        <BoardContainer gridSize={gridSize}>
            {holes.map((_, index) => (
                <Hole
                    key={index}
                    activeItem={activeHoles[index]}
                    onClick={ () => onHoleClick(index) }
                />
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

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    background-image: ${({ activeItem }) => {
        if (activeItem === 'mole') return `url(${moleImg})`;
        if (activeItem === 'bomb') return `url(${bombImg})`;
        if (activeItem === 'hit') return `url(${hitImg})`;
        return 'none'; 
    }};
`
