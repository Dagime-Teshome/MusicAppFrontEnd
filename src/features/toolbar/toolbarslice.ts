import { createSlice } from "@reduxjs/toolkit"
import type { filterState } from "../../util/types"

const initialState: filterState = {
  genres: [],
  isLoading: false,
}
export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterSongs: (state, action) => {
      // get data from api and set to the array
    },
    genreAction: () => {
      // get data from api and set to the array
    },
    loadGenres: (state, action) => {
      state.genres = action.payload
    },
  },
  selectors: {
    genres: filter => filter.genres,
  },
})

// Action creators are generated for each case reducer function
export const { filterSongs, loadGenres, genreAction } = filterSlice.actions
export const { genres } = filterSlice.selectors

export default filterSlice.reducer
