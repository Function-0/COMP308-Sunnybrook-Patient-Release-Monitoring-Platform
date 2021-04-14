import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function CreateUser(props) {
  const [user, setUser] = useState({ _id: '', firstName: '', lastName: '', 
                username: '',password: '',type:'' });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "/Nurses/";

  const saveUser = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { firstName: user.firstName, lastName: user.lastName, 
      username: user.username, password: user.password,type:user.type };
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/login')
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setUser({...user, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        <Form onSubmit={saveUser}>
          <Form.Group>
            <Form.Label> First Name</Form.Label>
            <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter first name" value={user.firstName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Last Name</Form.Label>
            <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter last name" value={user.lastName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" name="username" id="username" placeholder="Enter user name" value={user.username} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" name="password" id="password" placeholder="Enter password" value={user.password} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Control type="text" name="type" id="type" placeholder="Enter Type(Nurse/Patient)" value={user.type} onChange={onChange} />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CreateUser);
