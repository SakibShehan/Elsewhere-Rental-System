import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from '@/features/favorites/favoritesSlice'
import { saveSavedItems } from '@/features/favorites/favoritesStorage'
import searchHistoryReducer from '@/features/searchHistory/searchHistorySlice'
import { saveSearchPrompts } from '@/features/searchHistory/searchHistoryStorage'

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    searchHistory: searchHistoryReducer,
  },
})

// Save to the browser whenever the favorites change
let previousFavorites = store.getState().favorites

store.subscribe(() => {
  const currentFavorites = store.getState().favorites

  // Same object = nothing changed, so skip the write
  if (currentFavorites !== previousFavorites) {
    previousFavorites = currentFavorites
    saveSavedItems(currentFavorites.items)
  }
})

let previousSearchPrompts = store.getState().searchHistory.prompts

store.subscribe(() => {
  const currentSearchPrompts = store.getState().searchHistory.prompts

  if (currentSearchPrompts !== previousSearchPrompts) {
    previousSearchPrompts = currentSearchPrompts
    saveSearchPrompts(currentSearchPrompts)
  }
})

// Types inferred from the store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch