import React, { useEffect } from 'react';
import "../style/OverlayModal.css";

function OverlayModal({ overlayModal, setOverlayModal }) {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setOverlayModal({
        ...overlayModal,
        active: false
      })
    }, 2500)

    return (() => {
      clearTimeout(timer);
    })
  })

  return (
    <div id="modal" className={overlayModal.active ? 'active' : ''}>
      <h3>{overlayModal.title}</h3>
      <p>{overlayModal.message}</p>
    </div>
  )
}

export default OverlayModal;