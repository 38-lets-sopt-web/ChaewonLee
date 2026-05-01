import styled from '@emotion/styled'
import { useState, useRef } from 'react'
import InfoCard from '../components/InfoCard'
import GameController from '../components/GameController'
import GameBoard from '../components/GameBoard';
import ResultModal from '../components/ResultModal';

export default function GamePage() {
    const [level, setLevel] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(150);
    const [activeHoles, setActiveHoles] = useState({});
    const [score, setScore] = useState(0);
    const [successCount, setSuccessCount] = useState(0);
    const [failCount, setFailCount] = useState(0);
    const [message, setMessage] = useState("두더지 잡기 준비~");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const timerRef = useRef(null);
    const moleTimerRef = useRef(null);
    const gridSize = level+1;
    const LEVEL_TIMES = {
        1: 150, // 15초
        2: 200, // 20초
        3: 300  // 30초
    };

    const handleLevelChange = (newLevel) => {
        if (isPlaying) return;
        setLevel(newLevel);
        setTimeLeft(LEVEL_TIMES[newLevel]); 
    };
    
    const startGame = () => {
        if (timerRef.current) return;

        setIsPlaying(true);
        setTimeLeft(LEVEL_TIMES[level]);
        setActiveHoles({});

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    stopGame(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 100);

        moleTimerRef.current = setInterval(() => {
            spawnItem();
        }, 700);

    };

    const resetGame = () => {
        setIsPlaying(false);
        setScore(0);
        setSuccessCount(0);
        setFailCount(0);
        setTimeLeft(LEVEL_TIMES[level]); 
        setMessage("두더지 잡기 준비~");
    };

    const stopGame = (isTimeout = false) => {

        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        if (moleTimerRef.current) {
            clearInterval(moleTimerRef.current);
            moleTimerRef.current = null;
        }

        if (isTimeout) {
            setIsModalOpen(true);
            setTimeout(() => {
                setIsModalOpen(false);
                resetGame();
            }, 3000);
        } else {
            resetGame(); 
            setIsModalOpen(false);
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
        if(!isPlaying) return;
        const currentItem = activeHoles[index];

        if (currentItem === 'mole') {
            setActiveHoles((prev) => ({
                ...prev,
                [index]: 'hit',
            }));
            setScore((prev) => prev + 1);
            setSuccessCount((prev) => prev + 1);
            setMessage("두더지를 잡았다!");
        } else if (currentItem === 'bomb') {
            setActiveHoles((prev) => {
                const newState = { ...prev };
                delete newState[index];
                return newState;
            });
            setScore((prev) => prev - 1);
            setFailCount((prev) => prev + 1);
            setMessage("땡!!!!");
        }   
    };
        return (
        <>
            <SideSection>
                <InfoCard title="남은 시간" value={(timeLeft / 10).toFixed(1)} />
                <InfoCard title="총 점수" value={score} />
                <StatusGroup>
                    <InfoCard title="성공" value={successCount} />
                    <InfoCard title="실패" value={failCount} />
                </StatusGroup>
                <InfoCard title="안내 메세지" value={message} />
            </SideSection>
            <GameSection>
                <GameController
                    level={level}
                    setLevel={handleLevelChange}
                    isPlaying={isPlaying}
                    startGame={startGame}
                    stopGame={() => stopGame(false)}
                >
                </GameController>
                <GameBoard gridSize={gridSize} activeHoles={activeHoles} onHoleClick={handleHoleClick} />

            </GameSection>
            <ResultModal score={score} isOpen={isModalOpen} />
        </>
    );
}

const SideSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 360px;
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