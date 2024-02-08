import { useEffect, useRef } from "react"
import type { StatModalProps } from "../util/types"
import "./shared.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

function Modal({ openModal, closeModal, children }: StatModalProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal()
    } else {
      ref.current?.close()
    }
  }, [openModal])

  return (
    <dialog ref={ref} onCancel={closeModal}>
      <div className="dialogClass">
        <button className="closeButton" onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        {children}
        <button className="closeButtonBtm" onClick={closeModal}>
          Close
        </button>
      </div>
    </dialog>
  )
}

export default Modal
