import React, { useEffect, useState } from "react";
import Card from "./Card";
import Location from "../classes/Location";
import Loader from "./Loader";
import LocationClosed from "./LocationClosed";
import ErrorModal from "./ErrorModal";
import { useHistory } from "react-router-dom";
import HandleCookie from '../classes/Cookies'

function LocationStatus({ storeId, joinable }) {

  const [locationData, setLocationData] = useState({});
  const [storeOpen, setStoreOpen] = useState(false);
  const [errors, setErrors] = useState();
  const [alreadyWaiting, setAlreadyWaiting] = useState(false);
  const [linePosition, setLinePosition] = useState(null);

  const history = useHistory();

  useEffect(() => {
    function checkStoreStatus() {
      if (Location.validate(storeId)) {
        const locationInfo = Location.info(storeId);
        const url = `https://wait.genkisushihawaii.com/api/location-status?wwid=${locationInfo.waitwhileId}`
        fetch(url)
          .then(res => res.json())
          .then(json => {
            setLocationData(json)
            setStoreOpen(true);
          })
          .catch(err => setErrors(err.message))
      } else {
        setErrors('Invalid Location');
      }
    }

    checkStoreStatus();
    const timerId = setInterval(() => checkStoreStatus(), 10000)

    return (() => {
      clearInterval(timerId);
    })
  }, [storeId]);

  useEffect(() => {

    function checkCustomerStatus() {
      if (storeOpen === true) {
        const customerId = HandleCookie.get('customerId');
        if (customerId !== "") {
          setAlreadyWaiting(true);
            
          // Check if customer is currently on the waitlist
          const url = `https://wait.genkisushihawaii.com/api/customer-status?customerId=${customerId}`;
          fetch(url)
            .then(res => res.json())
            .then(json => {
              const results = json.results;
              if (results.length > 0) {
                setAlreadyWaiting(results[0]);
                setLinePosition(results[0].position);
              } else {
                setAlreadyWaiting(false);
              }
            })
            .catch(err => console.log(err));
  
        }
      }
    }
    checkCustomerStatus();

  }, [storeOpen])

  function handleJoinClick() {
    const preCheckValue = HandleCookie.get('preCheckId');
    if (preCheckValue === "") {
      history.push(`/${storeId}/join`);
    } else {
      history.push(`/${storeId}/checkin/${preCheckValue}`);
    }
  }

  function renderAlreadyWaiting(publicId, firstName, position) {

    const waitWhileLink = `https://app.waitwhile.com/l/${Location.info(storeId).shortName}/${publicId}`;

    return (
      <>
        Hey {firstName}!<br />You are currently <b>#{position}</b> in line.
        <a href={waitWhileLink}><button>View Virtual Ticket</button></a>
      </>
    )
  }

  const renderJoinButton = <button onClick={handleJoinClick} disabled={alreadyWaiting ? true : false}>Join the Waitlist</button>;

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
        <Card title={locationData.name} fullWidth>
          Our waitlist is <span className="open">open</span> and there are
          <h4 className="numWaiting">{locationData.numWaiting}</h4>
          parties waiting
          <hr />
          {
            linePosition ? renderAlreadyWaiting(alreadyWaiting.publicId, alreadyWaiting.firstName, alreadyWaiting.position) : renderJoinButton
          }
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