import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getSongs, songs } from "./songSlice"
import SongItem from "./SongItemComponent"
import "./songitem.css"
import Search from "../toolbar/toolbarcomponent"
import SongItemMobile from "./SongListMobViewComponent"
import Modal from "../../shared/ModalComponent"
import AddSongDialog from "./AddSongComponent"
import { updateSong, deleteSong } from "./songSlice"
import type { Song } from "../../util/types"
import DeleteConfirmModal from "../../shared/DeleteConfirmation"

export const SongComponent = () => {
  const dispatch = useAppDispatch()
  const songsList = useAppSelector(songs)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [openDeleteDialog, setDeleteDialog] = useState<boolean>(false)
  const [editData, setEditData] = useState<Song>()
  const [deleteData, setDeleteData] = useState<Song>()

  useEffect(() => {
    dispatch(getSongs())
  }, [])
  const handleDeleteClick = (data: Song) => {
    console.log("delete", data)
    setDeleteDialog(true)
    setDeleteData(data)
  }
  const onConfirmDelete = () => {
    dispatch(deleteSong(deleteData))
    setDeleteData(undefined)
    setDeleteDialog(false)
  }
  const handleUpdate = (data: Song) => {
    setEditData(data)
    setOpenDialog(true)
    console.log("update", data)
  }
  const onDialogSubmit = (data: Song) => {
    dispatch(updateSong({ data: data, id: data.id }))
  }
  return (
    <div className="songContainer">
      <Search></Search>
      <div className="tbl-content">
        <table className="modern-table">
          <thead className="tbl-header">
            <tr>
              <th>Title</th>
              <th>Artiest</th>
              <th>Album</th>
              <th>Genre</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {songsList.map(song => {
              return (
                <SongItem
                  key={song.id}
                  song={song}
                  onDelete={(data: Song) => {
                    handleDeleteClick(data)
                  }}
                  onEdit={(data: Song) => {
                    handleUpdate(data)
                  }}
                />
              )
            })}
          </tbody>
        </table>
      </div>
      <ul className="modern-list">
        {songsList.map(song => {
          return <SongItemMobile key={song.id} song={song} />
        })}
      </ul>
      <Modal openModal={openDialog} closeModal={() => setOpenDialog(false)}>
        <AddSongDialog
          handleSubmit={formData => {
            onDialogSubmit(formData)
          }}
          editData={editData}
        />
      </Modal>
      <DeleteConfirmModal
        openModal={openDeleteDialog}
        onCancel={() => {
          setDeleteData(undefined)
          setDeleteDialog(false)
        }}
        onDelete={onConfirmDelete}
      />
    </div>
  )
}
