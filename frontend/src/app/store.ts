import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from '@/features/favorites/favoritesSlice'
import { saveSavedItems } from '@/features/favorites/favoritesStorage'

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
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

// Types inferred from the store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch