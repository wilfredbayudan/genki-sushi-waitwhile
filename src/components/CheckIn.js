import React from "react";
import { useParams } from "react-router-dom";

function CheckIn({ storeId }) {
  const preCheckParams = useParams().preCheckId;

  return (
    <div>
      CheckIN PAGE for {storeId}<br />
      Precheck ID: {preCheckParams}
    </div>
  )
}

export default CheckIn;