import { useEffect, useRef } from 'react'

interface UseInfiniteScrollParams {
  enabled: boolean
  isLoading: boolean
  onIntersect: () => void
}

export const useInfiniteScroll = ({
  enabled,
  isLoading,
  onIntersect,
}: UseInfiniteScrollParams) => {
  const targetRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const target = targetRef.current

    if (!target || !enabled) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          onIntersect()
        }
      },
      { rootMargin: '200px' },
    )

    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  }, [enabled, isLoading, onIntersect])

  return targetRef
}
