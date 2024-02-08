import { createSlice } from "@reduxjs/toolkit"
import type { songState } from "../../util/types"

const initialState: songState = {
  songs: [],
  isLoading: false,
}

export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    getSongs: state => {
      state.isLoading = true
    },
    LoadSongs: (state, action) => {
      state.songs = action.payload
      state.isLoading = false
    },
    updateSong: (state, action) => {
      return state
    },
    createSong: (state, action) => {
      return state
    },
    deleteSong: (state, action) => {
      return state
    },
  },
  selectors: {
    songs: songs => songs.songs,
  },
})

export const { getSongs, updateSong, createSong, deleteSong, LoadSongs } =
  songSlice.actions
export const { songs } = songSlice.selectors

export default songSlice.reducer
