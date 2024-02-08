import { useEffect, useState } from "react"
import type { AddSongDialogProps, Song } from "../../util/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const AddSongDialog: React.FC<AddSongDialogProps> = ({
  editData,
  handleSubmit,
}) => {
  const [formData, setFormData] = useState<Song>({
    id: "",
    title: "",
    artist: "",
    genre: "",
    album: "",
  })
  useEffect(() => {
    if (editData) {
      setFormData(editData)
    }
  }, [editData])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    handleSubmit(formData)
    setFormData({
      id: "",
      title: "",
      artist: "",
      genre: "",
      album: "",
    })
  }

  return (
    <div className="addSongForm">
      <h2>Add New Song</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="formGroup">
          <label htmlFor="title">Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <div className="validation"></div>
        </div>
        <div className="formGroup">
          <label htmlFor="artist">Artist*</label>
          <input
            type="text"
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleInputChange}
            required
          />
          <div className="validation"></div>
        </div>
        <div className="formGroup">
          <label htmlFor="genre">Genre*</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            required
          />
          <div className="validation"></div>
        </div>
        <div className="formGroup">
          <label htmlFor="album">Album*</label>
          <input
            type="text"
            id="album"
            name="album"
            value={formData.album}
            onChange={handleInputChange}
            required
          />
          <div className="validation"></div>
        </div>
        <div className="formGroup">
          {editData ? (
            <button type="submit" className="addSongDialog">
              Update Song <FontAwesomeIcon icon={faPlus} />
            </button>
          ) : (
            <button type="submit" className="addSongDialog">
              Add Song <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default AddSongDialog
