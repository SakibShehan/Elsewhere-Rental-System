import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from '../features/favorites/favoritesSlice'

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
})

// Types inferred from the store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch