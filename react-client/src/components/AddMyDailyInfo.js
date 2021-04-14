import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';

//
function AddMyDailyInfo(props) {
    //
    const username = props.screen;
    console.log('props.screen',props.screen)
    const [myDailyInfo, setMyDailyInfo] = useState({ _id: '', pulseRate: '', systolicBloodPressure: '', diastolicBloodPressure: '', weight: '', temperature: '',  respiratoryRate: '', username: '' });
    const [showLoading, setShowLoading] = useState(false);
    //
    const apiUrl = "/api/myDailyInfos"
    //
    const saveMyDailyInfo = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {pulseRate: myDailyInfo.pulseRate, systolicBloodPressure: myDailyInfo.systolicBloodPressure, diastolicBloodPressure: myDailyInfo.diastolicBloodPressure, weight:myDailyInfo.weight, temperature:myDailyInfo.temperature, respiratoryRate:myDailyInfo.respiratoryRate,  username: username };
        //
        axios.post(apiUrl, data)
        .then((result) => {
            setShowLoading(false);
            console.log('results from save My Daily Info:',result.data)
            props.history.push('/showmyDailyInfo/' + result.data._id)

        }).catch((error) => setShowLoading(false));
    };
    //
    const onChange = (e) => {
        e.persist();
        setMyDailyInfo({...myDailyInfo, [e.target.name]: e.target.value});
      }
    
    return (
        <div>
        <h2> Add My Daily Info {username} </h2>
        {showLoading && 
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner> 
        } 
    
        <Jumbotron>
            <Form onSubmit={saveMyDailyInfo}>
              <Form.Group>
                <Form.Label> Pulse rate</Form.Label>
                <Form.Control type="text" name="pulseRate" id="pulseRate" placeholder="Enter pulse rate" value={myDailyInfo.pulseRate} onChange={onChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label> Systolic blood pressure</Form.Label>
                <Form.Control as="text" rows="3" name="systolicBloodPressure" id="systolicBloodPressure" placeholder="Enter systolic blood pressure" value={myDailyInfo.systolicBloodPressure} onChange={onChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label> Diastolic blood pressure</Form.Label>
                <Form.Control as="text" rows="3" name="diastolicBloodPressure" id="diastolicBloodPressure" placeholder="Enter diastolic blood pressure" value={myDailyInfo.diastolicBloodPressure} onChange={onChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label> Weight</Form.Label>
                <Form.Control type="text" name="weight" id="weight" placeholder="Enter weight" value={myDailyInfo.weight} onChange={onChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label> Temperature</Form.Label>
                <Form.Control type="text" name="temperature" id="temperature" placeholder="Enter temperature" value={myDailyInfo.temperature} onChange={onChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label> Respiration rate</Form.Label>
                <Form.Control type="text" name="respiratoryRate" id="respiratoryRate" placeholder="Enter respiratory rate" value={myDailyInfo.respiratoryRate} onChange={onChange} />
              </Form.Group>
                            
              <Button variant="primary" type="submit">
                Save My Daily Info
              </Button>

            </Form>
        </Jumbotron>
        </div>
    );


}

export default withRouter(AddMyDailyInfo);
