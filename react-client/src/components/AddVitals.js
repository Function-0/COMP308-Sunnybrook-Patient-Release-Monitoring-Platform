import { withRouter } from "react-router-dom";
import axios from 'axios';
import React, { Component, useEffect, useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

function AddVitals(props) {

  const [addvitals, setVitals] = useState({
    _id: "",
    heartRate: "",
    SBP: "",
    DBP: "",
    weight: "",
    temperature: "",
    respiratoryRate: "",
    //Patients: ""
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "/vitalsigns";
  const secondApiUrl = "/listpatients"
  const [data, setData] = useState([]);
  const [value,setValue]=useState('');


  useEffect(() => {
    const fetchData = async () => {
      axios.get(secondApiUrl)
        .then(result => {
          console.log('result.data:', result.data)
          //check if the user has logged in
          if(result.data.screen !== 'auth')
          {
            
            console.log('data in if:', result.data )
            setData(result.data);
            setShowLoading(false);
          }
        }).catch((error) => {
          console.log('error in fetchData:', error)
        });
      };  
    fetchData();
  }, []);


  const saveVitals = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
        heartRate: addvitals.heartRate,
        SBP: addvitals.SBP,
        DBP: addvitals.DBP,
        weight: addvitals.weight,
        temperature: addvitals.temperature,
        respiratoryRate: addvitals.respiratoryRate,
        //Patients: addvitals.Patients
    };
    console.log(data);
    axios
      .post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        // props.history.push("/show/" + result.data._id);
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    console.log(e);
    e.persist();
    setVitals({ ...addvitals, [e.target.name]: e.target.value });
  };

  const handleSelect=(e)=>{
    console.log(e);
    let firstNme = JSON.parse(e).firstName;
    console.log(firstNme);
    // setVitals();
    // setValue(e.firstName)
    // addvitals.Patients
  }
  return (
    <div>
      <div>
        <img
          src={(require = process.env.PUBLIC_URL + "/sunnybrook-logo.jpg")}
        ></img>
      </div>

      <Jumbotron>
        <Form onSubmit={saveVitals}>
          <Form.Group>
            <Form.Label> Heart Rate (Per Minute)</Form.Label>
            <Form.Control
              type="Number"
              name="heartRate"
              id="heartRate"
              placeholder="Eg. 90" value={addvitals.heartRate} onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Weight (lbs)</Form.Label>
            <Form.Control
              type="Number"
              name="weight"
              id="weight"
              placeholder="Eg. 210" value={addvitals.weight} onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Temperature (C)</Form.Label>
            <Form.Control
              type="Number"
              name="temperature"
              id="temperature"
              rows="3"
              placeholder="Eg. 39.8" value={addvitals.temperature} onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Respiratory Rate (Per Min)</Form.Label>
            <Form.Control
              type="Number"
              name="respiratoryRate"
              id="respiratoryRate"
              placeholder="Eg. 15" value={addvitals.respiratoryRate} onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Diastolic Blood Pressure</Form.Label>
            <Form.Control
              type="Number"
              name="DBP"
              id="DBP"
              placeholder="Eg. 15" value={addvitals.DBP} onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Systolic Blood Pressure</Form.Label>
            <Form.Control
              type="Number"
              name="SBP"
              id="SBP"
              placeholder="Eg. 15" value={addvitals.SBP} onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Patient</Form.Label>
            <DropdownButton id="dropdown-basic-button" title="Choose Patient"
             onSelect={handleSelect}>
            {data.map((item, idx) => (
             <Dropdown.Item key={idx} eventKey={JSON.stringify(item)} value={item.firstName}>{item.firstName}</Dropdown.Item>

            ))}
             
            </DropdownButton>
          </Form.Group>

          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(AddVitals);
