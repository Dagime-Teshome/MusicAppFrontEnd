import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import type { SongItemProps } from "../../util/types"
import "./songitem.css"

const SongItem: React.FC<SongItemProps> = ({ song, onEdit, onDelete }) => {
  return (
    <tr className="songItemClass">
      <td>{song.title}</td>
      <td>{song.artist}</td>
      <td>{song.genre}</td>
      <td>{song.album}</td>
      <td className="actionButtons">
        <button
          className="actionButton"
          onClick={() => {
            onEdit(song)
          }}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button
          className="actionButton deleteButton"
          onClick={() => {
            onDelete(song)
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  )
}

export default SongItem
