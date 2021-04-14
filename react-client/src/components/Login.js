import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
//
import View from './View'
//
function App() {
  //state variable for the screen, admin or user
  const [screen, setScreen] = useState('auth');
  //store input field data, user name and password
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const apiUrl = "/signin";
  const apiUrl2 = "/psignin"
  //send username and password to the server
  // for initial authentication
  const auth = async () => {
    console.log('calling auth')
    console.log(username)
    try {
      //make a get request to /authenticate end-point on the server
      const loginData = { auth: { username, password } }
      //call api
      const res = await axios.post(apiUrl, loginData);
      console.log(res.data.auth)
      if(res.data.auth == undefined){
        window.alert("Incorrect Login");
      }
      console.log(res.data.screen)
      //process the response
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) { //print the error
      console.log(e);
    }
  
  };
  const authPat = async () => {
    console.log('calling auth')
    console.log(username)
    try {
      //make a get request to /authenticate end-point on the server
      const loginData = { auth: { username, password } }
      //call api
      const res = await axios.post(apiUrl2, loginData);
      console.log(res.data.auth)
      if(res.data.auth == undefined){
        window.alert("Incorrect Login");
      }
      console.log(res.data.screen)
      //process the response
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) { //print the error
      console.log(e);
      window.alert("Incorrect Login");
    }
  
  };
  
  //check if the user already logged-in
  const readCookie = async () => {
    try {
      console.log('--- in readCookie function ---');

      //
      const res = await axios.get('/read_cookie');
      // 
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen)
      }
    } catch (e) {
      setScreen('auth');
      console.log(e);
    }
  };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []); //only the first render
  //
  return (
    <div className="App">
      {screen === 'auth' 
        ? <div>
          <img src="sunnybrook-logo.jpg" alt="Girl in a jacket" width="500" height="100" marginTop="250"></img>
          <p><label>Username: </label>
          <br/>
          <input type="text" onChange={e => setUsername(e.target.value)} />
          <br/>
          <label>Password: </label>
          <br/>
          <input type="password" onChange={e => setPassword(e.target.value)} />
          <br/>
          <button style={{marginRight: '5px',marginTop:'10px',backgroundColor:"#4CAF50",height:"40px",width:"270px"}} onClick={auth}>Login as a Nurse</button>
          <button style={{marginRight: '5px',marginTop:'10px',backgroundColor:"#4CAF50",height:"40px",width:"270px"}} onClick={authPat}>Login as a Patient</button>
          </p>
        </div>
        : <View screen={screen} setScreen={setScreen} />
      }
    </div>
  );
}

export default App;

