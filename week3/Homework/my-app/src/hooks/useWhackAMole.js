import { useState, useRef, useEffect } from 'react'
import {
    LEVEL_CONFIG,
    MOLE_VISIBLE_DURATION,
    TIMER_TICK_INTERVAL,
    RESULT_DISPLAY_DURATION,
} from '../constants/game'

export default function useWhackAMole() {
    const [level, setLevel] = useState(1)
    const [isPlaying, setIsPlaying] = useState(false)
    const [timeLeft, setTimeLeft] = useState(LEVEL_CONFIG[1].time)
    const [activeHoles, setActiveHoles] = useState({})
    const [score, setScore] = useState(0)
    const [successCount, setSuccessCount] = useState(0)
    const [failCount, setFailCount] = useState(0)
    const [message, setMessage] = useState('두더지 잡기 준비~')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const timerRef = useRef(null)
    const moleTimerRef = useRef(null)

    const config = LEVEL_CONFIG[level]
    const gridSize = config.grid

    // timeLetf가 0이 되면 게임 종료
    // useRef로 score 값 저장하지 않기 위해 추가
    useEffect(() => {
        if (isPlaying && timeLeft <= 0) {
            stopGame(true)
        }
    }, [timeLeft, isPlaying])

    // 모달이 닫히면 게임 리셋
    // useRef를 복제해서 사용하지 않기 위해 추가
    useEffect(() => {
        if (!isModalOpen) {
            resetGame()
        }
    }, [isModalOpen])

    const handleLevelChange = (newLevel) => {
        if (isPlaying) return
        setLevel(newLevel)
        setTimeLeft(LEVEL_CONFIG[newLevel].time)
    }

    const clearAllTimers = () => {
        if (timerRef.current) clearInterval(timerRef.current)
        if (moleTimerRef.current) clearInterval(moleTimerRef.current)
        timerRef.current = null
        moleTimerRef.current = null
    }

    function resetGame() {
        clearAllTimers()
        setActiveHoles({})
        setIsPlaying(false)
        setScore(0)
        setSuccessCount(0)
        setFailCount(0)
        setTimeLeft(LEVEL_CONFIG[level].time)
        setMessage('두더지 잡기 준비~')
    }

    const stopGame = (isTimeout = false) => {
        clearAllTimers()
        setActiveHoles({})

        if (isTimeout) {
            saveRanking(score)
            setIsPlaying(false)
            setIsModalOpen(true)

            setTimeout(() => {
                setIsModalOpen(false)
            }, RESULT_DISPLAY_DURATION)
        } else {
            setIsPlaying(false)
        }
    }

    const spawnItem = () => {
        const { grid, bombProbability } = config
        const totalHoles = grid * grid
        const randomIndex = Math.floor(Math.random() * totalHoles)
        const itemType = Math.random() < bombProbability ? 'bomb' : 'mole'

        setActiveHoles((prev) => ({
            ...prev,
            [randomIndex]: itemType,
        }))

        setTimeout(() => {
            setActiveHoles((prev) => {
                const next = { ...prev }
                delete next[randomIndex]
                return next
            })
        }, MOLE_VISIBLE_DURATION)
    }

    const startGame = () => {
        if (timerRef.current) return
        setIsPlaying(true)
        setScore(0)
        setSuccessCount(0)
        setFailCount(0)
        setTimeLeft(config.time)
        setActiveHoles({})

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) return 0
                return prev - 1
            })
        }, TIMER_TICK_INTERVAL)

        moleTimerRef.current = setInterval(
            spawnItem,
            config.spawnInterval
        )
    }

    const handleHoleClick = (index) => {
        if (!isPlaying) return
        const item = activeHoles[index]
        
        if (item === 'mole') {
            setActiveHoles((prev) => ({ ...prev, [index]: 'hit' }))
            setScore((prev) => prev + 1)
            setSuccessCount((prev) => prev + 1)
            setMessage('두더지를 잡았다!')
        }
        if (item === 'bomb') {
            setActiveHoles((prev) => {
                const next = { ...prev }
                delete next[index]
                return next
            })
            setScore((prev) => prev - 1)
            setFailCount((prev) => prev + 1)
            setMessage('땡!!!!')
        }
    }

    const saveRanking = (finalscore) => {
        const newRecord = {
            level,
            score: finalscore,
            date: new Date().toLocaleString(),
        }

        try {
            const existing = JSON.parse(
                localStorage.getItem('mole-rankings') || '[]'
            )

            localStorage.setItem(
                'mole-rankings',
                JSON.stringify([...existing, newRecord])
            )
        } catch (e) {
            console.error('ranking save error', e)
        }
    }

    return {
        level,
        isPlaying,
        timeLeft,
        activeHoles,
        score,
        successCount,
        failCount,
        message,
        isModalOpen,
        gridSize,
        handleLevelChange,
        startGame,
        stopGame,
        handleHoleClick,
    }
}