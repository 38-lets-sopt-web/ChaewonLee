import styled from '@emotion/styled'
import { useState, useRef } from 'react'
import InfoCard from '../components/InfoCard'
import GameController from '../components/GameController'
import GameBoard from '../components/GameBoard';

export default function GamePage() {
    const [level, setLevel] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(150);
    const [activeHoles, setActiveHoles] = useState({});
    const timerRef = useRef(null);
    const moleTimerRef = useRef(null);
    const gridSize = level+1;
    
    const startGame = () => {
        if (timerRef.current) return;

        setIsPlaying(true);
        setTimeLeft(150);
        setActiveHoles({});

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    stopGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 100);

        moleTimerRef.current = setInterval(() => {
            spawnItem();
        }, 700);
    };

    const stopGame = () => {
        setIsPlaying(false);

        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        if (moleTimerRef.current) {
            clearInterval(moleTimerRef.current);
            moleTimerRef.current = null;
        }

        setActiveHoles({});
    };

    const spawnItem = () => {
        const totalHoles = gridSize * gridSize;
        const randomIndex = Math.floor(Math.random() * totalHoles);
        const itemType = Math.random() < 0.2 ? 'bomb' : 'mole';

        setActiveHoles((prev) => ({
            ...prev,
            [randomIndex]: itemType,
        }));

        setTimeout(() => {
            setActiveHoles((prev) => {
                const newState = { ...prev };
                delete newState[randomIndex];
                return newState;
            });
        }, 1000); 
    };

    const handleHoleClick = (index) => {
        const currentItem = activeHoles[index];

        if (currentItem === 'mole') {
            setActiveHoles((prev) => ({
                ...prev,
                [index]: 'hit',
            }));
        } 
    };
        return (
        <>
            <SideSection>
                <InfoCard title="남은 시간" value={(timeLeft / 10).toFixed(1)} />
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
                <GameBoard gridSize={gridSize} activeHoles={activeHoles} onHoleClick={handleHoleClick} />

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