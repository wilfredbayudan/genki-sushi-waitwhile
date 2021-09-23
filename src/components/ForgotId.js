import React from 'react';
import { useHistory } from "react-router-dom";

function ForgotId({ storeId }) {
  const history = useHistory();

  function handleClick() {
    history.push(`/${storeId}/join`)
  }

  return (
    <>
      <div className="notice bluebg">
        <button className="createid" onClick={handleClick}>Need to create a PreCheck ID?</button>
      </div>
    </>
  )
}

export default ForgotId;