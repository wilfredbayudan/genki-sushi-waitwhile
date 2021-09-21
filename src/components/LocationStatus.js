import React, { useEffect, useState } from "react";
import Card from "./Card";
import Location from "../classes/Location";
import Loader from "./Loader";

function LocationStatus({ storeId, joinable }) {

  const [locationData, setLocationData] = useState({});

  useEffect(() => {
    if (Location.validate(storeId)) {
      const url = `https://genkisushihawaii.com/waitlist/checkStatus.php?storeId=${storeId}`
      fetch(url)
        .then(res => res.json())
        .then(json => setLocationData(json))
        .catch(err => console.log(err))
    } else {
      console.log('Invalid Location')
    }

  }, [storeId]);

  console.log(locationData);

  if (Object.keys(locationData).length === 0) {
    return <Loader />
  } else if (Array.isArray(locationData)) {
    return (
      <Card title="Oops">
        Something unexpected happened.
      </Card>
    )
  } else {
    return (
      <Card title={locationData.name}>
        Location Status for { storeId } is { joinable ? 'JOINABLE' : 'NOT JOINABLE'}
      </Card>
    )
  }
}

export default LocationStatus;