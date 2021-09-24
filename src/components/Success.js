import React from "react";
import Card from "./Card";
import Location from "../classes/Location";

function Success ({ storeId, checkInData }) {

  const waitWhileLink = `https://app.waitwhile.com/l/${Location.info(storeId).shortName}/${checkInData.publicId}`;

  return (
    <Card title="You're on the waitlist!">
      {checkInData.firstName}, you're currently
      <h4 className="numWaiting">#{checkInData.position}</h4>
      in line at <b>{Location.info(storeId).name}</b>. We'll send you a text when it's your turn. Please have your vaccination/test documentation ready. In the meantime, why not <a href="https://genkisushiusa.com/waitmenuv3" alt="our menu" target="_blank" rel="noreferrer">check out the menu?</a>
      <a href={waitWhileLink}><button>View Virtual Ticket</button></a>
    </Card>
  )
}

export default Success;