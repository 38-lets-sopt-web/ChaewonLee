import styled from '@emotion/styled'
import { useState } from 'react'
import InfoCard from '../components/InfoCard'
import GameController from '../components/GameController'
import GameBoard from '../components/GameBoard';

export default function GamePage() {
    const [level, setLevel] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const startGame = () => setIsPlaying(true);
    const stopGame = () => setIsPlaying(false);
    const gridSize = level+1;
    return (
        <>
            <SideSection>
                <InfoCard title="남은 시간" value="20.0" />
                <InfoCard title="총 점수" value="0" />
                <StatusGroup>
                    <InfoCard title="성공" value="3" />
                    <InfoCard title="실패" value="5" />
                </StatusGroup>
                <InfoCard title="안내 메세지" value="두더지를 잡았다!" />
            </SideSection>
            <GameSection>
                <GameController
                    level={level}
                    setLevel={setLevel}
                    isPlaying={isPlaying}
                    startGame={startGame}
                    stopGame={stopGame}
                >
                </GameController>
                <GameBoard gridSize={gridSize} />

            </GameSection>
        </>
    );
}

const SideSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const StatusGroup = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
    width: 100%;
`;

const GameSection = styled.section`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.bgCard};
    border-radius: ${({theme}) => theme.borderRadius.md};
`;