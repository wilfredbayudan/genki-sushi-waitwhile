import React, { useEffect, useState } from "react";
import Card from "./Card";
import Location from "../classes/Location";
import Loader from "./Loader";
import LocationClosed from "./LocationClosed";
import ErrorModal from "./ErrorModal";
import { useHistory, useRouteMatch } from "react-router-dom";

function LocationStatus({ storeId, joinable }) {

  const [locationData, setLocationData] = useState({});
  const [errors, setErrors] = useState();

  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    if (Location.validate(storeId)) {
      const locationInfo = Location.info(storeId);
      const url = `https://wait.genkisushihawaii.com/api/location-status.php?wwid=${locationInfo.waitwhileId}`
      fetch(url)
        .then(res => res.json())
        .then(json => setLocationData(json))
        .catch(err => setErrors(err.message))
    } else {
      setErrors('Invalid Location');
    }

  }, [storeId]);

  function handleJoinClick() {
    history.push(`${match.url}/join`);
  }

  if (errors) {
    return <ErrorModal errors={errors} />
  }

  if (Object.keys(locationData).length === 0) {
    return <Loader />
  } else if (Array.isArray(locationData)) {
    return (
      <Card title="Oops">
        Something unexpected happened.
      </Card>
    )
  } else {
    // Check if location is open
    if (locationData.isWaitlistOpen) {
      return (
        <Card title={locationData.name}>
          Our waitlist is <span className="open">open</span> and there are
          <h4 className="numWaiting">{locationData.numWaiting}</h4>
          parties waiting
          <hr />
          <button onClick={handleJoinClick}>Join the Waitlist</button>
        </Card>
      )
    } else {
      return (
        <LocationClosed storeId={storeId} />
      )
    }
  }
}

export default LocationStatus;