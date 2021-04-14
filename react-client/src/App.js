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

import CreateUser from './components/CreateUser';
import ShowUser from './components/ShowUser';
import ShowArticle from './components/ShowArticle';
import ListArticles from "./components/ListArticles";
import Home from './components/Home';
import Login from './components/Login';
import NurseLandingPage from './components/NurseLandingPage';
import AddVitals from './components/AddVitals';
import PredictHepatitis from './components/PredictHepatitis';
//
function App() {

  return (
    <Router>
      <Navbar bg="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/list">List of Students</Nav.Link>
            <Nav.Link href="/listarticles">List of Courses</Nav.Link>
            <Nav.Link href="/create">Sign Up</Nav.Link>
            <Nav.Link href="/nurselanding">Nurse Landing</Nav.Link>
            <Nav.Link href="/addvitals">Add Vitals</Nav.Link>
            <Nav.Link href="/predicthepatitis">Predict Hepatitis</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    
      <div>          
          <Route render ={()=> < Home />} path="/" />
          <Route render ={()=> < Login />} path="/login" />
          <Route render ={()=> < List />} path="/list" />
          <Route render={() => <ListArticles />} path="/listarticles" />
          <Route render ={()=> < EditUser />} path="/edit/:id" />
          <Route render ={()=> < CreateUser />} path="/create" />
          <Route render ={()=> < ShowUser />} path="/show/:id" />
          <Route render ={()=> < ShowArticle />} path="/showarticle/:id" />
          <Route render ={()=> < EditArticle />} path="/editarticle/:id" />
          <Route render ={()=> < NurseLandingPage />} path="/nurselanding" />
          <Route render ={()=> < AddVitals />} path="/addvitals" />
          <Route render ={()=> < PredictHepatitis />} path="/predicthepatitis" />

      </div>

    </Router>


  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
