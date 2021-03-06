import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
//
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
//
import List from './components/List';
import EditUser from './components/EditUser';
import EditArticle from './components/EditArticle';

import CreateUser from './components/CreatePatient';
import CreateNurse from './components/CreateNurse'
import ShowUser from './components/ShowUser';
import showNurse from "./components/showNurse";
import NurseLanding from "./components/NurseLandingPage";
import View from "./components/View";
import Home from './components/Home';
import Login from './components/Login';
//
function App() {

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/create">Sign Up Patients</Nav.Link>
            <Nav.Link href="/createNurse">Sign Up Nurses</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    
      <div>          
           <Route render ={()=> < Home />} path="/" />
           <Route render ={()=> < Login />} path="/login" />
           <Route render ={()=> < CreateUser />} path="/create" />
           <Route render ={()=> < CreateNurse />} path="/createNurse" />
          {/* <Route render ={()=> < List />} path="/list" />
          <Route render={() => <ListArticles />} path="/listarticles" />
          <Route render={()=> <View />} path="/view"/>
          <Route render ={()=> < EditUser />} path="/edit/:id" />
          <Route render ={()=> < ShowUser />} path="/show/:id" />
          <Route render ={()=> < ShowDailyInfos/>} path="/showdailyInfos/:id" />
          <Route render ={()=> < showNurse />} path="/showNurse/:id" /> */}
          {/* <Route render ={()=> < ShowArticle />} path="/showarticle/:id" /> */}
          {/* <Route render ={()=> < EditArticle />} path="/editarticle/:id" />
          <Route render={()=><NurseLanding />} path ="/Nurselanding"/>  */}

      </div>

    </Router>


  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
