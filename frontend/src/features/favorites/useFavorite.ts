import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectIsSaved, toggleFavorite } from './favoritesSlice'

export function useFavorite(propertyId: string) {
  const dispatch = useAppDispatch()

  // True or false: the component re-renders only when this value flips
  const isSaved = useAppSelector((state) => selectIsSaved(state, propertyId))

  // Same function between renders (stable reference)
  const toggle = useCallback(() => {
    dispatch(toggleFavorite(propertyId))
  }, [dispatch, propertyId])

  return { isSaved, toggle }
}