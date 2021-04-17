import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function ShowUser(props) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/Nurses/" + props.match.params.id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  /*const editUser = (id) => {
    props.history.push({
      pathname: '/edit/' + id
    });
  };*/

 /* const deleteUser = (id) => {
    setShowLoading(true);
    const user = { firstName: data.firstName, lastName: data.lastName, 
      username: data.username, password: data.password };
  
    axios.delete(apiUrl, user)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/list')
      }).catch((error) => setShowLoading(false));
  };*/

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      <Jumbotron>
        <h1>Name: {data.firstName}, {data.lastName}</h1>
        <p>User Name: {data.username}</p>
        

        <p>
      
        </p>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowUser);
