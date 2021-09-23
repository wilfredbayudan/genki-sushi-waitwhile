import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import OverlayModal from "./OverlayModal";
import "../style/ContactTracingForm.css";
import Location from "../classes/Location";
import Card from "./Card";
import HandleCookie from '../classes/Cookies'

function CheckInForm({ preCheckParams, storeId, setCheckedIn }) {
  const history = useHistory();

  const [preCheckInput, setPreCheckInput] = useState(preCheckParams ? preCheckParams : '');
  const [preCheckError, setPreCheckError] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [retrievedId, setRetrievedId] = useState(false);
  const [additionalDetails, setAdditionalDetails] = useState({
    partySize: '',
    counterOk: false,
    wheelchair: false,
    highchair: false
  })

  const [loaderActive, setLoaderActive] = useState(false);

  const [overlayModal, setOverlayModal] = useState({
    active: false,
    title: '',
    message: ''
  })

  function handleDetailsChange(e) {
    let value = e.target.value;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    setAdditionalDetails({
      ...additionalDetails,
      [e.target.name]: value
    })
  }

  function validatePhone(phone) {
    const regex = /^[0-9]{11,15}$/
    const result = regex.test(phone.replace(/\D/g,''));
    if (!result) {
      setPhoneError(true);
      return false;
    } else {
      setPhoneError(false)
      return true;
    }
  }

  useEffect(() => {
    if (phone !== '') {
      validatePhone(phone);
    }
  },[phone])

  useEffect(() => {
    if (preCheckInput.length === 6) {
      setLoaderActive(true)
      const url = `https://wait.genkisushihawaii.com/api/check-precheckid?pid=${preCheckInput}`;
      fetch(url)
        .then(res => res.json())
        .then(json => {
          if (json.length > 0) {
            setPhone(json[0].phone)
            setRetrievedId(json[0]);
            setPreCheckError(false);
          } else {
            setPreCheckError(true);
          }
          setLoaderActive(false)
        })
        .catch(err => console.log(err))

    } else if (preCheckInput.length > 0) {
      setPreCheckError(true)
    }
    return (() => setLoaderActive(false))
  }, [preCheckInput, setCheckedIn])
  
  function handlePreCheckChange(e) {
    setPreCheckInput(e.target.value);
  }

  function handlePhoneChange(value) {
    setPhone(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (preCheckError || !validatePhone(phone) || parseInt(additionalDetails.partySize) < 1) {
      setOverlayModal({
        active: true,
        title: 'Oops!',
        message: 'Please provide the required information to continue.'
      })
    } else {
      setLoaderActive(true);

      // Set Form Data
      const dataObj = {
        ...additionalDetails,
        preCheckId: retrievedId.precheckid,
        phone: phone.replace(/\D/g,''),
        storeId: storeId,
        wwid: Location.waitwhileId(storeId),
        name: retrievedId.name,
      }

      const sendDataObj = new FormData();
      Object.keys(dataObj).forEach(inputName => {
        sendDataObj.append(inputName, dataObj[inputName]);
      })

      // Check if still open before submitting
      Location.checkStatus(storeId)
      .then(res => {
        if (res) {
          
          // Post checkin
          const url = `https://wait.genkisushihawaii.com/api/new-checkin`;
          fetch(url, { method: 'POST', body: sendDataObj })
            .then(res => res.json())
            .then(json => {
              if (json[0].id) {
                HandleCookie.set('preCheckId', retrievedId.precheckid, 365);            
                setCheckedIn(json[0]);
              } else {
                console.log('oops');
              }
              setLoaderActive(false);
            })
            .catch(err => {
              setLoaderActive(false);
            })

        } else {
          history.push(`/${storeId}`);
        }
      })
      .catch(err => history.push(`../${storeId}`))
    }
  }

  return (
    <Card title="Check-In Details" fullWidth>
      <OverlayModal overlayModal={overlayModal} setOverlayModal={setOverlayModal} />
      <LoaderOverlay active={loaderActive} />
      <MandateNotice />
      {retrievedId ? <WelcomeBack userData={retrievedId} /> : <ForgotId storeId={storeId} />}
      <form id="checkin-form" onSubmit={handleSubmit}>
        <div className="form-input">
          <TextField 
            id="preCheckId" 
            name="preCheckId"
            label="PreCheck ID"
            variant="standard" 
            value={preCheckInput}
            inputProps={{ maxLength: '6'}}
            onChange={handlePreCheckChange}
            error={preCheckError ? true : false}
            helperText={preCheckError ? 'Invalid PreCheck ID' : ''}
            disabled={retrievedId ? true : false}
            fullWidth required
            />
        </div>
        <div className="form-input">
          <FormControl fullWidth>
              <MaterialUiPhoneNumber 
                inputProps={{ minLength: '9' }} 
                onChange={handlePhoneChange} 
                value={phone} 
                disableDropdown 
                defaultCountry={'us'} 
                name="phone" 
                label="Confirm Phone Number" 
                helperText="Provide a valid mobile number, we'll use this to text you a virtual waitlist ticket." 
                error={phoneError ? true : false}
                required />
          </FormControl>
        </div>
        <div className="form-input">
        <FormControl variant="standard" style={{minWidth: 120}}>
          <InputLabel id="partysize-label">Party Size</InputLabel>
          <Select
            labelId="partysize-label"
            id="partysize-select"
            value={additionalDetails.partySize}
            onChange={handleDetailsChange}
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
            <FormControlLabel control={<Checkbox name="counterOk" onChange={handleDetailsChange} checked={additionalDetails.counterOk} />} label="Counter OK!" />
            <FormControlLabel control={<Checkbox name="wheelchair" onChange={handleDetailsChange} checked={additionalDetails.wheelchair} />} label="Wheelchair accessible" />
            <FormControlLabel control={<Checkbox name="highchair" onChange={handleDetailsChange} checked={additionalDetails.highchair} />} label="Need high chair" />
          </FormGroup>
        </div>
        <hr />
        <button type="submit" disabled={retrievedId ? false : true}>Check-In</button>
      </form>
    </Card>
  )
}

export default CheckInForm;