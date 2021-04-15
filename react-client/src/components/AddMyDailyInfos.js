import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';

//
function AddMyDailyInfos(props) {
    //
    const username = props.screen;
    console.log('props.screen',props.screen)
    const [dailyInfos, setDailyInfos] = useState({ _id: '', heartRate: '', SBP: '', DBP: '', weight: '', temperature: '',  respiratoryRate: '', username: '' });
    const [showLoading, setShowLoading] = useState(false);
    //
    const apiUrl = "/api/dailyInfos"
    //
    const saveDailyInfos = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {heartRate: dailyInfos.heartRate, SBP: dailyInfos.SBP, DBP: dailyInfos.DBP, weight:dailyInfos.weight, temperature:dailyInfos.temperature, respiratoryRate: dailyInfos.respiratoryRate,  username: username };
        //
        axios.post(apiUrl, data)
        .then((result) => {
            setShowLoading(false);
            console.log('results from save My Daily Info:',result.data)
            props.history.push('/showdailyInfos/' + result.data._id)

        }).catch((error) => setShowLoading(false));
    };
    //
    const onChange = (e) => {
        e.persist();
        setDailyInfos({...dailyInfos, [e.target.name]: e.target.value});
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
            <Form onSubmit={saveDailyInfos}>
              <Form.Group>
                <Form.Label> Heart Rate</Form.Label>
                <Form.Control type="text" name="heartRate" id="heartRate" placeholder="Enter heart rate" value={dailyInfos.heartRate} onChange={onChange} />
              </Form.Group>


              <Form.Group>
                <Form.Label>  Systolic blood pressure</Form.Label>
                <Form.Control type="text" name="SBP" id="SBP"  placeholder="Enter systolic blood pressure" value={dailyInfos.SBP}  onChange={onChange} />
              </Form.Group>

            <Form.Group>
                <Form.Label>   Diastolic blood pressure</Form.Label>
                <Form.Control type="text" name="DBP" id="DBP" placeholder="Enter diastolic blood pressure" value={dailyInfos.DBP} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label> Weight</Form.Label>
                <Form.Control type="text" name="weight" id="weight" placeholder="Enter weight" value={dailyInfos.weight} onChange={onChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label> Temperature</Form.Label>
                <Form.Control type="text" name="temperature" id="temperature" placeholder="Enter temperature" value={dailyInfos.temperature} onChange={onChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label> Respiration rate</Form.Label>
                <Form.Control type="text" name="respiratoryRate" id="respiratoryRate" placeholder="Enter respiratory rate" value={dailyInfos.respiratoryRate} onChange={onChange} />
              </Form.Group>

             {/* <Form.Group>
                <Form.Label> Patient</Form.Label>
                <Form.Control type="text" name="Patients" id="Patients" placeholder="Enter Patients" value={myDailyInfo.Patients} onChange={onChange} />
              </Form.Group> */}
                            
              <Button variant="primary" type="submit">
                Save My Daily Infos
              </Button>

            </Form>
        </Jumbotron>
        </div>
    );


}

export default withRouter(AddMyDailyInfos);
