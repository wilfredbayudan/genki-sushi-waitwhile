import React from "react";
import TextField from '@mui/material/TextField';
import "../style/ContactTracingForm.css";

function ContactTracingForm() {
  return (
    <form id="contact-tracing-form">
      <p>
        Oahu restauraunts are <a href="https://www.hawaiinewsnow.com/2020/09/23/under-order-oahu-restaurants-will-have-keep-diners-contact-details-days/">required to collect contact information</a> from one member of each dining party. Please fill out the questionnaire below.
      </p>
      <div class="form-input">
        <TextField id="first-name" label="First Name" variant="standard" fullWidth required />
      </div>
      <div class="form-input">
        <TextField id="last-name" label="Last Name" variant="standard" fullWidth required />
      </div>
    </form>
  )
}

export default ContactTracingForm;