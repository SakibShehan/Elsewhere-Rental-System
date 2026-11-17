import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

// Define state of favourite properties. Each saved item has a propertyId and a timestamp 
// Types
export interface SavedItem {
  propertyId: string
  savedAt: string
}

interface FavoritesState {
  items: SavedItem[]
}

// Initial state
const initialState: FavoritesState = {
  items: [],
}

// Slice for managing favorite properties
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: {
      reducer(state, action: PayloadAction<SavedItem>) {
        const exists = state.items.some(
          (item) => item.propertyId === action.payload.propertyId,
        )

        if (exists) {
          state.items = state.items.filter(
            (item) => item.propertyId !== action.payload.propertyId,
          )
        } else {
          state.items.push(action.payload)
        }
      },
      // Prepare: build the payload (impure work like Date goes here)
      prepare(propertyId: string) {
        return {
          payload: { propertyId, savedAt: new Date().toISOString() },
        }
      },
    },
  },
})

// Actions
export const { toggleFavorite } = favoritesSlice.actions

// Selectors: functions that read the state and return a value
export const selectSavedItems = (state: RootState) => state.favorites.items

export const selectSavedCount = (state: RootState) =>
  state.favorites.items.length

export const selectIsSaved = (state: RootState, propertyId: string) =>
  state.favorites.items.some((item) => item.propertyId === propertyId)
export default favoritesSlice.reducer