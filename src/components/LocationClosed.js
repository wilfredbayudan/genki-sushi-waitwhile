import React from 'react';
import Location from '../classes/Location';
import Card from './Card';

function LocationClosed({ storeId }) {
  const contactTracingUrl = `https://genkisushihawaii.com/precheck/indexV3.php?store=${storeId}`;

  return (
    <Card title="Sorry!">
      The waitlist for {Location.info(storeId).name} is currently <span className="closed">CLOSED</span>. <a href={contactTracingUrl}>Click here</a> if you were asked to submit contact tracing information.
    </Card>
  )
}

export default LocationClosed;