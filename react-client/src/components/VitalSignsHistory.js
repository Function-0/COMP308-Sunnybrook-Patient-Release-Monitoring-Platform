import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import {
    Form} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router-dom";
import Login from "./Login";

function VitalSignsHistory(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [listError, setListError] = useState(false);
  const apiUrl = "/vitalsigns";
  const [patientName, setPatientName] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(apiUrl)
        .then((result) => {
          console.log("result.data:", result.data);
          //check if the user has logged in
          if (result.data.screen !== "auth") {
            console.log("data in if:", result.data);
            setData(result.data);
            setShowLoading(false);
          }
        })
        .catch((error) => {
          console.log("error in fetchData:", error);
          setListError(true);
        });
    };
    fetchData();
  }, []);

  
  const onChange = (e) => {
    console.log(e);
    e.persist();
    console.log(e.target.value);
    setPatientName(e.target.value);
    console.log(data);
    // getDataByUser(patientName)
  };

  const getDataByUser = (e) => {
      let array = data.find();
      console.log(data);
  }

  return (
    <div>
      <div>
        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}

        <div>
        <img
          src={(require = process.env.PUBLIC_URL + "/sunnybrook-logo.jpg")}
        ></img>
      </div>
      <Form >
        <Form.Group>
            <Form.Label> Patient UserName</Form.Label>
            <Form.Control
              type="text"
              name="usename"
              id="username"
              placeholder="Damilare09" onChange={onChange}

            />
        </Form.Group>
      </Form>
      <h4>username is {patientName} </h4>
        <Table striped bordered hover>
          <thead>
            <tr>
            <th>Created Time</th>
              <th>Heart Rate</th>
              <th>Systolic Blood Pressure</th>
              <th>Diastolic Blood Pressure</th>
              <th>Weight</th>
              <th>Temperature</th>
              <th>Respitory Rate</th>
            </tr>
          </thead>
          <tbody>
        
            
            {data.map((item, idx) => (
            <tr>
             <td>{item.created}</td>
             <td>{item.heartRate}</td>
             <td>{item.SBP}</td>
             <td>{item.DBP}</td>
             <td>{item.weight}</td>
             <td>{item.temperature}</td>
             <td>{item.respiratoryRate}</td>
             </tr>
            ))}
            
          </tbody>
        </Table>

    
      </div>
    </div>
  );
}
//
export default withRouter(VitalSignsHistory);
