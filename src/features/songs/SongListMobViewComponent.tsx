import "./songitem.css"
import { useAppDispatch } from "../../app/hooks"
import { updateSong, deleteSong } from "./songSlice"
import { useState } from "react"
import type { Song } from "../../util/types"
import Modal from "../../shared/ModalComponent"
import AddSongDialog from "./AddSongComponent"
import DeleteConfirmModal from "../../shared/DeleteConfirmation"

interface SongItemMobileProps {
  song: Song
}

const SongItemMobile: React.FC<SongItemMobileProps> = ({ song }) => {
  const dispatch = useAppDispatch()
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [editData, setEditData] = useState<Song | undefined>()
  const [deleteData, setDeleteData] = useState<Song | undefined>()

  const handleDeleteClick = (data: Song) => {
    console.log("delete", data)
    setDeleteData(data)
    setOpenDeleteDialog(true)
  }

  const onConfirmDelete = () => {
    if (deleteData) {
      dispatch(deleteSong(deleteData.id))
      setDeleteData(undefined)
      setOpenDeleteDialog(false)
    }
  }

  const handleUpdate = (data: Song) => {
    console.log("update", data)
    setEditData(data)
    setOpenDialog(true)
  }

  const onDialogSubmit = (data: Song) => {
    dispatch(updateSong({ data, id: data.id }))
    setOpenDialog(false)
  }

  return (
    <>
      <li className="songListItemCard">
        <div className="songListItemContent">
          <div>
            <strong>Title:</strong> {song.title}
          </div>
          <div>
            <strong>Artist:</strong> {song.artist}
          </div>
          <div>
            <strong>Genre:</strong> {song.genre}
          </div>
          <div>
            <strong>Album:</strong> {song.album}
          </div>
        </div>
        <div className="songListItemActions">
          <button onClick={() => handleDeleteClick(song)}>Delete</button>
          <button onClick={() => handleUpdate(song)}>Update</button>
        </div>
      </li>
      <Modal openModal={openDialog} closeModal={() => setOpenDialog(false)}>
        <AddSongDialog
          handleSubmit={formData => onDialogSubmit(formData)}
          editData={editData}
        />
      </Modal>
      <DeleteConfirmModal
        openModal={openDeleteDialog}
        onCancel={() => {
          setDeleteData(undefined)
          setOpenDeleteDialog(false)
        }}
        onDelete={onConfirmDelete}
      />
    </>
  )
}

export default SongItemMobile
