import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import LoaderOverlay from "./LoaderOverlay";
import CheckInForm from "./CheckInForm";
import Location from "../classes/Location";
import Success from "./Success";

function CheckIn({ storeId }) {
  const preCheckParams = useParams().preCheckId;
  const [loaderOverlay, setLoaderOverlay] = useState(true);
  const history = useHistory();
  const [checkedIn, setCheckedIn] = useState(false);

  useEffect(() => {
    Location.checkStatus(storeId)
      .then(res => {
        if (res === true) {
          setLoaderOverlay(false)
        } else {
          history.push(`../${storeId}`);
        }
      })
      .catch(err => history.push(`../${storeId}`))
  }, [history, storeId]);


  return (
    <>
      <LoaderOverlay active={loaderOverlay} />
      {
        checkedIn ?
        <Success checkInData={checkedIn} storeId={storeId} />
        :
        <CheckInForm preCheckParams={preCheckParams} storeId={storeId} setCheckedIn={setCheckedIn} />
      }
    </>
  )
}

export default CheckIn;