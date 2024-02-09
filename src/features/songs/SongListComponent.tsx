import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getSongs, songs } from "./songSlice"
import SongItem from "./SongItemComponent"
import "./songitem.css"
import Search from "../toolbar/toolbarcomponent"
import SongItemMobile from "./SongListMobViewComponent"
import Modal from "../../shared/ModalComponent"
import AddSongDialog from "./AddSongComponent"
import { updateSong, deleteSong, isLoading } from "./songSlice"
import type { Song } from "../../util/types"
import DeleteConfirmModal from "../../shared/DeleteConfirmation"

export const SongComponent: React.FC = () => {
  const dispatch = useAppDispatch()
  const songsList = useAppSelector(songs)
  const Loading = useAppSelector(isLoading)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [openDeleteDialog, setDeleteDialog] = useState<boolean>(false)
  const [editData, setEditData] = useState<Song>()
  const [deleteData, setDeleteData] = useState<Song>()

  useEffect(() => {
    dispatch(getSongs())
  }, [])
  const handleDeleteClick = (data: Song) => {
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
  }
  const onDialogSubmit = (data: Song) => {
    dispatch(updateSong({ data: data, id: data.id }))
    setOpenDialog(false)
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
            {Loading ? (
              <tr>
                <td colSpan={3}>Loading.....</td>
              </tr>
            ) : songsList.length === 0 ? (
              <tr>
                <td colSpan={3}>No Data found</td>
              </tr>
            ) : (
              songsList.map(song => {
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
              })
            )}
          </tbody>
        </table>
      </div>
      <ul className="modern-list">
        {Loading ? (
          <li className="songListItemCard">
            <div className="songListItemCard">Loading....</div>:
          </li>
        ) : songsList.length === 0 ? (
          <li className="songListItemCard">
            <div className="songListItemCard">No Data Found</div>:
          </li>
        ) : (
          songsList.map(song => {
            return <SongItemMobile key={song.id} song={song} />
          })
        )}
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
