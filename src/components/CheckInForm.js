import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import MaterialUiPhoneNumber from "material-ui-phone-number";
import LoaderOverlay from "./LoaderOverlay";
import MandateNotice from "./MandateNotice";
import ForgotId from "./ForgotId";
import WelcomeBack from "./WelcomeBack";
import "../style/ContactTracingForm.css";

function CheckInForm({ preCheckParams }) {
  const [preCheckInput, setPreCheckInput] = useState(preCheckParams ? preCheckParams : '');
  const [preCheckError, setPreCheckError] = useState();
  const [phone, setPhone] = useState('');
  const [retrievedId, setRetrievedId] = useState(false);

  const [loaderActive, setLoaderActive] = useState(false);

  useEffect(() => {
    if (preCheckInput.length === 6) {
      setLoaderActive(true)
      const url = `https://wait.genkisushihawaii.com/api/check-precheckid?pid=${preCheckInput}`;
      fetch(url)
        .then(res => res.json())
        .then(json => {
          setLoaderActive(false)
          setPhone(json[0].phone)
          setRetrievedId(json[0]);
        })
        .catch(err => console.log(err))

    } else if (preCheckInput.length > 0) {
      setPreCheckError(true)
    }
    return (() => setLoaderActive(false))
  }, [preCheckInput])
  
  function handlePreCheckChange(e) {
    setPreCheckInput(e.target.value);
    console.log(preCheckInput)
  }

  function handlePhoneChange(value) {
    setPhone(value);
  }

  return (
    <div>
      {retrievedId.name}
      <LoaderOverlay active={loaderActive} />
      <MandateNotice />
      {retrievedId ? <WelcomeBack userData={retrievedId} /> : <ForgotId />}
      <form id="checkin-form">
        <div className="form-input">
          <TextField 
            id="preCheckId" 
            name="preCheckId"
            label="PreCheck ID"
            variant="standard" 
            value={preCheckInput}
            inputProps={{ maxLength: '6'}}
            onChange={handlePreCheckChange}
            fullWidth required
            />
        </div>
        <div className="form-input">
          <FormControl>
              <MaterialUiPhoneNumber onChange={handlePhoneChange} value={phone} disableDropdown defaultCountry={'us'} name="phone" fullWidth label="Confirm Phone Number" helperText="Provide a valid mobile number, we'll use this to text you a virtual waitlist ticket." required />
          </FormControl>
        </div>
        <div className="form-input">
        <FormControl variant="standard" style={{minWidth: 120}}>
          <InputLabel id="partysize-label">Party Size</InputLabel>
          <Select
            labelId="partysize-label"
            id="partysize-select"
            value=""
            name="partySize"
            label="Party Size"
            required
          > <MenuItem value=""></MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="6">6</MenuItem>
            <MenuItem value="7">7</MenuItem>
            <MenuItem value="8">8</MenuItem>
            <MenuItem value="9">9</MenuItem>
            <MenuItem value="10">10</MenuItem>
          </Select>
        </FormControl>
        </div>
        <div className="form-input">
          <FormGroup>
            <FormControlLabel control={<Checkbox name="counterOk" />} label="Counter OK!" />
            <FormControlLabel control={<Checkbox name="wheelchair" />} label="Wheelchair accessible" />
            <FormControlLabel control={<Checkbox name="highchair" />} label="Need high chair" />
          </FormGroup>
        </div>
        <hr />
        <button type="submit">Check-In</button>
        <div>
          Controlled Input Test:<br />
          {preCheckInput}<br />
          {phone}
        </div>
      </form>
    </div>
  )
}

export default CheckInForm;