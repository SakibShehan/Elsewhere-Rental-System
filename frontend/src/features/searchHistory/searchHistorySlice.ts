import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import { loadSearchPrompts } from './searchHistoryStorage'

const MAX_SEARCH_PROMPTS = 5

interface SearchHistoryState {
  prompts: string[]
}

const initialState: SearchHistoryState = {
  prompts: loadSearchPrompts(),
}

const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {
    recordSearchPrompt(state, action: PayloadAction<string>) {
      const prompt = action.payload.trim()
      if (!prompt) return

      state.prompts = [
        prompt,
        ...state.prompts.filter(
          (existingPrompt) =>
            existingPrompt.toLocaleLowerCase() !== prompt.toLocaleLowerCase(),
        ),
      ].slice(0, MAX_SEARCH_PROMPTS)
    },
  },
})

export const { recordSearchPrompt } = searchHistorySlice.actions
export const selectSearchPrompts = (state: RootState) =>
  state.searchHistory.prompts

export default searchHistorySlice.reducer
