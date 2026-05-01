import { useState, useRef } from 'react'

const LEVEL_TIMES = { 1: 150, 2: 200, 3: 300 }

export default function useWhackAMole() {
    const [level, setLevel] = useState(1)
    const [isPlaying, setIsPlaying] = useState(false)
    const [timeLeft, setTimeLeft] = useState(150)
    const [activeHoles, setActiveHoles] = useState({})
    const [score, setScore] = useState(0)
    const [successCount, setSuccessCount] = useState(0)
    const [failCount, setFailCount] = useState(0)
    const [message, setMessage] = useState('두더지 잡기 준비~')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const timerRef = useRef(null)
    const moleTimerRef = useRef(null)
    const isSavedRef = useRef(false)
    const scoreRef = useRef(0)

    const gridSize = level + 1

    const handleLevelChange = (newLevel) => {
        if (isPlaying) return
        setLevel(newLevel)
        setTimeLeft(LEVEL_TIMES[newLevel])
    }

    const resetGame = () => {
        setIsPlaying(false)
        setScore(0)
        scoreRef.current = 0
        setSuccessCount(0)
        setFailCount(0)
        setTimeLeft(LEVEL_TIMES[level])
        setMessage('두더지 잡기 준비~')
    }

    const stopGame = (isTimeout = false) => {
        clearInterval(timerRef.current)
        clearInterval(moleTimerRef.current)
        timerRef.current = null
        moleTimerRef.current = null
        setActiveHoles({})

        if (isTimeout && !isSavedRef.current) {
        isSavedRef.current = true
        saveRanking()
        setIsModalOpen(true)
        setTimeout(() => {
            setIsModalOpen(false)
            resetGame()
        }, 3000)
        } else {
        resetGame()
        }
    }

    const spawnItem = () => {
        const totalHoles = gridSize * gridSize
        const randomIndex = Math.floor(Math.random() * totalHoles)
        const itemType = Math.random() < 0.2 ? 'bomb' : 'mole'

        setActiveHoles((prev) => ({ ...prev, [randomIndex]: itemType }))
        setTimeout(() => {
        setActiveHoles((prev) => {
            const next = { ...prev }
            delete next[randomIndex]
            return next
        })
        }, 1000)
    }

    const startGame = () => {
        if (timerRef.current) return
        setIsPlaying(true)
        isSavedRef.current = false
        setTimeLeft(LEVEL_TIMES[level])
        setActiveHoles({})

        timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
            if (prev <= 1) { stopGame(true); return 0 }
            return prev - 1
        })
        }, 100)

        moleTimerRef.current = setInterval(spawnItem, 700)
    }

    const handleHoleClick = (index) => {
        if (!isPlaying) return
        const item = activeHoles[index]

        if (item === 'mole') {
        setActiveHoles((prev) => ({ ...prev, [index]: 'hit' }))
        setScore((prev) => { scoreRef.current = prev + 1; return prev + 1 })
        setSuccessCount((prev) => prev + 1)
        setMessage('두더지를 잡았다!')
        } else if (item === 'bomb') {
        setActiveHoles((prev) => { const next = { ...prev }; delete next[index]; return next })
        setScore((prev) => { scoreRef.current = prev - 1; return prev - 1 })
        setFailCount((prev) => prev + 1)
        setMessage('땡!!!!')
        }
    }

    const saveRanking = () => {
        const newRecord = { level, score: scoreRef.current, date: new Date().toLocaleString() }
        const existing = JSON.parse(localStorage.getItem('mole-rankings') || '[]')
        localStorage.setItem('mole-rankings', JSON.stringify([...existing, newRecord]))
    }

    return {
        // 상태
        level, isPlaying, timeLeft, activeHoles, score,
        successCount, failCount, message, isModalOpen, gridSize,
        // 액션
        handleLevelChange, startGame, stopGame, handleHoleClick,
    }
    }