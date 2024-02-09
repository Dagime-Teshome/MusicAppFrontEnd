import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getSongs, createSong } from "../songs/songSlice"
import { filterSongs, genres } from "./toolbarslice"
import type { Song } from "../../util/types"
import AddSongDialog from "../songs/AddSongComponent"
import { genreAction } from "../../features/toolbar/toolbarslice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChartPie, faPlus } from "@fortawesome/free-solid-svg-icons"
import "./toolbar.css"
import Modal from "../../shared/ModalComponent"
import { Stats } from "../stats/StatsComponent"

const Search: React.FC = () => {
  const dispatch = useAppDispatch()
  const genreList = useAppSelector(genres)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedGenre, setSelectedGenre] = useState<string>("All")
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [openStatDialog, setOpenStatDialog] = useState<boolean>(false)

  useEffect(() => {
    dispatch(genreAction())
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch()
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, selectedGenre])

  const handleSearch = () => {
    if (searchTerm.trim() || selectedGenre !== "All") {
      dispatch(filterSongs({ searchTerm, genre: selectedGenre }))
    } else {
      dispatch(getSongs())
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value)
  }

  const onDialogSubmit = (formData: Song) => {
    dispatch(createSong(formData))
    setOpenDialog(false)
  }
  return (
    <>
      <div className="bannerClass">
        <span className="headingClass">Song List</span>
        <button
          className="floatingButton statsButton"
          onClick={() => {
            setOpenStatDialog(true)
          }}
        >
          <FontAwesomeIcon icon={faChartPie} />
        </button>
      </div>
      <div className="toolbarClass">
        <div className="filterFormClass">
          <label className="labelClass">Search</label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search by title or artist"
            className="search-input"
          />
        </div>
        <div className="filterFormClass">
          <label className="labelClass">Genre</label>
          <select
            className="genre-dropdown"
            value={selectedGenre}
            onChange={handleGenreChange}
          >
            <option value="All">All</option>
            {genreList.map(genre => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <button
          className="addButton"
          onClick={() => {
            setOpenDialog(true)
          }}
        >
          Add <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <Modal openModal={openDialog} closeModal={() => setOpenDialog(false)}>
        <AddSongDialog
          handleSubmit={formData => {
            onDialogSubmit(formData)
          }}
        />
      </Modal>
      <Modal
        openModal={openStatDialog}
        closeModal={() => setOpenStatDialog(false)}
      >
        <Stats />
      </Modal>
    </>
  )
}

export default Search
