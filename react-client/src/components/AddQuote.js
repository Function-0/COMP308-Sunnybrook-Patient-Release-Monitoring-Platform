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

function AddQuote(props) {

  const [addQuote, setQuote] = useState({
    message: "",
    patientId: ""
  });

  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "/setquote";
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


  const saveQuote = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
        message: addQuote.message,
        id: addQuote.patientId
        //Patients: addQuote.Patients
    };
    console.log("look here", data);
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
    setQuote({ ...addQuote, [e.target.name]: e.target.value });
  };

  const handleSelect=(e)=>{
    console.log(e);
    let id = JSON.parse(e)._id;
    setQuote({ ...addQuote, patientId: id })

  }

  return (
    <div>
      <div>
        <img
          src={(require = process.env.PUBLIC_URL + "/sunnybrook-logo.jpg")}
        ></img>
      </div>

      <Jumbotron>
        <Form onSubmit={saveQuote}>

          <Form.Group>
            <Form.Label>Quote Of the Day {addQuote.patientsId}</Form.Label>
            <Form.Control
              type="text"
              name="message"
              id="message"
              placeholder="Eg. Seize The Day" value={addQuote.message} onChange={onChange}
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

export default withRouter(AddQuote);
