import { useEffect, useRef } from "react"
import type { DeleteModalProps } from "../util/types"
import "./shared.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

function DeleteConfirmModal({
  openModal,
  onDelete,
  onCancel,
}: DeleteModalProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal()
    } else {
      ref.current?.close()
    }
  }, [openModal])

  return (
    <dialog ref={ref}>
      <div className="dialogClass">
        <button className="closeButton" onClick={onCancel}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Confirm Song Deletion</h2>
        <p>Are you sure you want to delete this song?</p>
        <div className="button-group">
          <button
            className="confirm-dialog-button confirm-dialog-cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="confirm-dialog-button confirm-dialog-delete-button"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default DeleteConfirmModal
