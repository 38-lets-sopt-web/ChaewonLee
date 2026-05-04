    import styled from '@emotion/styled'
    import useWhackAMole from '../hooks/useWhackAMole'
    import InfoCard from '../components/InfoCard'
    import GameController from '../components/GameController'
    import GameBoard from '../components/GameBoard'
    import ResultModal from '../components/ResultModal'

    export default function GamePage() {
    const game = useWhackAMole()

    return (
        <>
        <SideSection>
            <InfoCard title="남은 시간" value={(game.timeLeft / 10).toFixed(1)} />
            <InfoCard title="총 점수" value={game.score} />
            <StatusGroup>
            <InfoCard title="성공" value={game.successCount} />
            <InfoCard title="실패" value={game.failCount} />
            </StatusGroup>
            <InfoCard title="안내 메세지" value={game.message} />
        </SideSection>

        <GameSection>
            <GameController
            level={game.level}
            setLevel={game.handleLevelChange}
            isPlaying={game.isPlaying}
            startGame={game.startGame}
            stopGame={() => game.stopGame(false)}
            />
            <GameBoard
            gridSize={game.gridSize}
            activeHoles={game.activeHoles}
            onHoleClick={game.handleHoleClick}
            />
        </GameSection>

        <ResultModal score={game.finalScore} isOpen={game.isModalOpen} />
        </>
    )
    }

    const SideSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 360px;
    `
    const StatusGroup = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
    width: 100%;
    `
    const GameSection = styled.section`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.bgCard};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    `