import React, { useState, useEffect } from "react";
import Card from './Card';
import Location from '../classes/Location';
import ContactTracingForm from "./ContactTracingForm";


function Join ({ storeId }) {
  return (
    <Card title="Contact Tracing" fullWidth>
      <ContactTracingForm />
    </Card>
  )
}

export default Join;