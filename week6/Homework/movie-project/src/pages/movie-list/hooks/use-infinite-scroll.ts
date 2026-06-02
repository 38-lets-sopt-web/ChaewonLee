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
  const isLoadingRef = useRef(isLoading)

  useEffect(() => {
    isLoadingRef.current = isLoading
  }, [isLoading])

  useEffect(() => {
    const target = targetRef.current

    if (!target || !enabled) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoadingRef.current) {
          onIntersect()
        }
      },
      { rootMargin: '200px' },
    )

    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  }, [enabled, onIntersect])

  return targetRef
}
