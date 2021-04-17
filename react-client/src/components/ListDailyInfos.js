import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Login from './Login';
import Table from 'react-bootstrap/Table';

function ListDailyInfos(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/showdailyInfos";

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          console.log('result.data:',result.data)
          //check if the user has logged in
          //if(result.data.screen !== 'auth')
          //{
            
            console.log('data in if:', result.data )
            setData(result.data);
            setShowLoading(false);
          //}
        }).catch((error) => {
          console.log('error in fetchData:', error)
        });
      };  
    fetchData();
  }, []);

  const showDetail = (id) => {
    props.history.push({
      pathname: '/showdailyInfos/' + id
    });
  }

  return (
    <div>
      { data.length > 0
        ? <div>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner> }
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
        : < Login />
      }
    </div>

  );
}
//
export default withRouter(ListDailyInfos);
