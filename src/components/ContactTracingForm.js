import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import "../style/ContactTracingForm.css";
import countryData from "../data/Countries";

function ContactTracingForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    addressStreet: '',
    addressCity: '',
    addressState: '',
    addressZip: '',
    addressCountry: 'US'
  })

  const [formErrors, setFormErrors] = useState({
    firstName: null,
    lastName: null,
    addressStreet: null,
    addressCity: null,
    addressState: null,
    addressZip: null,
    addressCountry: null
  })

  function handleChange(e) {
    const name = e.target.name;
    let value = e.target.value;

    if (e.target.type === "checked") {
      value = e.target.checked;
    }

    setFormData({
      ...formData,
      [name]: value,
    })
    
    formValidate(name, value)
  }

  function formValidate(inputName, inputValue) {

    let result = true;
    let regex;
    let errorMessage;
    switch(inputName) {
      case 'firstName':
        regex = /^[a-zA-Z][a-zA-Z '`]{1,32}$/
        result = regex.test(inputValue);
        if (!result) {
          errorMessage = 'Please enter a valid first name.';
        }
        break;
      case 'lastName':
        regex = /^[a-zA-Z][a-zA-Z '`]{1,32}$/
        result = regex.test(inputValue);
        if (!result) {
          errorMessage = 'Please enter a valid last name.';
        }
        break;
      case 'addressStreet':
        regex = /^[0-9][a-zA-Z0-9 -.#'`]{5,50}$/
        result = regex.test(inputValue);
        if (!result) {
          errorMessage = 'Please enter a valid street address.';
        }
        break;
      case 'addressCity':
        regex = /^[a-zA-Z\- _`:.,\s']+$/
        result = regex.test(inputValue);
        if (!result) {
          errorMessage = 'Please enter a valid city.';
        }
        break;
      case 'addressState':
        regex = /^[a-zA-Z '`-]{2,32}$/
        result = regex.test(inputValue);
        if (!result) {
          errorMessage = 'Please enter a valid state / province.';
        }
        break;
      case 'addressZip':
        regex = /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/
        result = regex.test(inputValue);
        if (!result) {
          errorMessage = 'Please enter a valid zip / postal code.';
        }
        break;
      default:
        result = true;
        break;
    }

    if (result === false) {
      setFormErrors({
        ...formErrors,
        [inputName]: errorMessage
      })
    } else {
      setFormErrors({
        ...formErrors,
        [inputName]: null
      })
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    if (Object.keys(formErrors).filter(key => formErrors[key] !== null).length > 0) {
      console.log(`Errors found`)
    } else {
      console.log('No errors found, continue to API')
    }

  }

  function renderTextField(id, name, label) {

    if (formErrors[name]) {
      return (
        <TextField 
          id={id} 
          name={name}
          label={label}
          variant="standard" 
          onChange={handleChange} 
          onBlur={() => {formValidate(name, formData[name])}}
          value={formData[name]} 
          helperText={formErrors[name]}
          fullWidth required error/>
      )
    } else {
      return (
        <TextField 
          id={id} 
          name={name}
          label={label}
          variant="standard" 
          onChange={handleChange} 
          onBlur={() => {formValidate(name, formData[name])}}
          value={formData[name]} 
          fullWidth required />
      )
    }
  }

  const renderCountries = countryData.map(country => {
    return <MenuItem value={country.code} key={country.code}>{country.name}</MenuItem>
  })

  return (
    <form id="contact-tracing-form" onSubmit={handleSubmit}>
      <div className="notice yellowbg">
        ⓘ Local mandates <a href="https://www.hawaiinewsnow.com/2020/09/23/under-order-oahu-restaurants-will-have-keep-diners-contact-details-days/" target="_blank" rel="noreferrer">require restauraunts to collect contact information</a> from one member of each dining party. Please fill out the questionnaire below.
      </div>
      <div className="notice bluebg">
        Already did this? <a href="/">Click here</a> to check-in with your PreCheckID.
      </div>
      <div className="form-input">
        {renderTextField('first-name', 'firstName', 'First Name')}
      </div>
      <div className="form-input">
        {renderTextField('last-name', 'lastName', 'Last Name')}
      </div>
      <div className="form-input">
        {renderTextField('address-street', 'addressStreet', 'Residency Street Address (No PO Boxes)')}
      </div>
      <div className="form-input">
        {renderTextField('address-city', 'addressCity', 'City')}
      </div>
      <div className="form-input">
        {renderTextField('address-state', 'addressState', 'State / Province / Region')}
      </div>
      <div className="form-input">
        {renderTextField('address-zip', 'addressZip', 'ZIP / Postal Code')}
      </div>
      <div className="form-input">
        <FormControl variant="standard" fullWidth>
          <InputLabel id="country-label">Country / Territory</InputLabel>
          <Select
            labelId="country-label"
            id="country-select"
            value={formData.addressCountry}
            label="Country / Territory"
            onChange={handleChange}
          >
            {renderCountries}
          </Select>
        </FormControl>
      </div>
      <button>Next</button>
    </form>
  )
}

export default ContactTracingForm;