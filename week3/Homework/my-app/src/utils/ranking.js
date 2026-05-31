export const saveRanking = (storageKey, newRecord) => {
    try {
        const existing = JSON.parse(
            localStorage.getItem(storageKey) || '[]'
        )

        localStorage.setItem(
            storageKey,
            JSON.stringify([...existing, newRecord])
        )
    } catch (e) {
        console.error('ranking save error', e)
    }
}