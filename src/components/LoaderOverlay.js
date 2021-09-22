import React from "react";
import "../style/LoaderOverlay.css";

function LoaderOverlay({ active }) {
  return (
    <div id="loaderOverlay" className={ active ? 'active' : ''}>
      <div className="spinner"></div>
    </div>
  )
}

export default LoaderOverlay;