import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Card from "./Card";
import "../style/ContactTracingForm.css";
import LoaderOverlay from "./LoaderOverlay";
import CheckInForm from "./CheckInForm";
import Location from "../classes/Location";

function CheckIn({ storeId }) {
  const preCheckParams = useParams().preCheckId;
  const [loaderOverlay, setLoaderOverlay] = useState(true);
  const history = useHistory();

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
    <Card title="Check-In Details" fullWidth>
      <LoaderOverlay active={loaderOverlay} />
      <CheckInForm preCheckParams={preCheckParams} storeId={storeId} />
    </Card>
  )
}

export default CheckIn;