import type { ActionType } from "typesafe-actions"
import type { call, put, takeLatest } from "redux-saga/effects"

export interface Song {
  id: string
  title: string
  artist: string
  genre: string
  album: string
}

export interface StatModalProps {
  openModal: boolean
  closeModal: () => void
  children: React.ReactNode
}
export interface DeleteModalProps {
  openModal: boolean
  onDelete: () => void
  onCancel: () => void
}
export interface SongItemProps {
  song: Song
  onEdit: (formData: Song) => void
  onDelete: (FormData: Song) => void
}
export interface ToastState {
  success: boolean
  error: boolean
  message: string | null
}

export interface songState {
  songs: Song[]
  isLoading: boolean
}
export interface filterState {
  genres: string[]
  isLoading: boolean
}

export interface StatState {
  stats: Stats
}
export interface ISong {
  id: string
  title: string
  artist: string
  genre: string
  album: string
}
export interface SearchType {
  searchTerm: string
  selectedGenre: string
}

export interface AddSongDialogProps {
  handleSubmit: (formData: Song) => void
  editData?: any
}

export interface Stats {
  totalSongs: number
  totalArtists: number
  totalAlbums: number
  totalGenres: number
  popularArtist: {
    _id: string
    totalSongs: number
  } | null
  popularGenre: {
    _id: string
    totalSongs: number
  } | null
  leastPopularArtist: {
    _id: string
    totalSongs: number
  } | null
  leastPopularGenre: {
    _id: string
    totalSongs: number
  } | null
}

export interface SongsState {
  songs: Song[]
  loading: boolean
  error: string | null
}

export type SongsSaga = Generator<
  typeof call | typeof put | typeof takeLatest,
  void,
  Song | string | string[] | Song[] | undefined
>
