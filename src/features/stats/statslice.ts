import { createSlice } from "@reduxjs/toolkit"
import type { StatState } from "../../util/types"
import "./stats.css"

const initialState: StatState = {
  stats: {
    totalSongs: 0,
    totalArtists: 0,
    totalAlbums: 0,
    totalGenres: 0,
    popularArtist: null,
    popularGenre: null,
    leastPopularArtist: null,
    leastPopularGenre: null,
  },
}

export const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {
    getStats: state => {
      // get data from api and set to the array
      return state
    },
    LoadStats: (state, action) => {
      // get data from api and set to the array
      state.stats = action.payload
    },
  },
  selectors: {
    stat: stats => stats.stats,
  },
})

// Action creators are generated for each case reducer function
export const { getStats, LoadStats } = statSlice.actions
export const { stat } = statSlice.selectors

export default statSlice.reducer
