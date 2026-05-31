import { useState } from 'react';

export const useRanking = (storageKey = 'mole-rankings') => {
    const [rankings, setRankings] = useState(() => {
        try {
            const raw = localStorage.getItem(storageKey);
            const parsed = raw ? JSON.parse(raw) : [];

            if (!Array.isArray(parsed)) return [];

            return [...parsed].sort((a, b) => {
                const levelDiff = (b.level ?? 0) - (a.level ?? 0);
                if (levelDiff !== 0) return levelDiff;
                return (b.score ?? 0) - (a.score ?? 0);
            });
        } catch {
            return [];
        }
    });

    const handleReset = () => {
        if (window.confirm("정말로 모든 랭킹 기록을 지우시겠습니까?")) {
            localStorage.removeItem(storageKey);
            setRankings([]);
            alert("초기화되었습니다.");
        }
    };

    return { rankings, handleReset };
};