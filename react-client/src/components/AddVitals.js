import { useParams, withRouter } from "react-router-dom";

import React, { Component, useReducer } from "react";
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
    Patients: ""
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "/addvitals";

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
        Patients: ""
    };
    axios
      .post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push("/show/" + result.data._id);
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div>
        <img
          src={(require = process.env.PUBLIC_URL + "/sunnybrook-logo.jpg")}
        ></img>
      </div>

      <Jumbotron>
        <Form>
          <Form.Group>
            <Form.Label> Heart Rate (Per Minute)</Form.Label>
            <Form.Control
              type="Number"
              name="heartRate"
              id="heartRate"
              placeholder="Eg. 90"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Weight (lbs)</Form.Label>
            <Form.Control
              type="Number"
              name="weight"
              id="weight"
              placeholder="Eg. 210"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Temperature (C)</Form.Label>
            <Form.Control
              type="Number"
              name="temperature"
              id="temperature"
              rows="3"
              placeholder="Eg. 39.8"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Respiratory Rate (Per Min)</Form.Label>
            <Form.Control
              type="Number"
              name="respiratoryRate"
              id="respiratoryRate"
              placeholder="Eg. 15"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Patient</Form.Label>
            <DropdownButton id="dropdown-basic-button" title="Choose Patient">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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
