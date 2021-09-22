import React from "react";
import Card from './Card';
import ContactTracingForm from "./ContactTracingForm";


function Join ({ storeId }) {
  return (
    <Card title="Contact Tracing" fullWidth>
      <ContactTracingForm />
    </Card>
  )
}

export default Join;