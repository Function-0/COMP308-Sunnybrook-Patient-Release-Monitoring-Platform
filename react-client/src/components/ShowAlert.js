import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import Table from 'react-bootstrap/Table';


function ShowAlert(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [listError, setListError] = useState(false);
  const apiUrl = "/getalerts";


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

  // const editArticle = (id) => {
  //   props.history.push({
  //     pathname: '/editarticle/' + id
  //   });
  // };

  // const deleteArticle = (id) => {
  //   setShowLoading(true);
  //   const article = { title: data.title, content: data.content };
  //   //
  //   axios.delete(apiUrl, article)
  //     .then((result) => {
  //       setShowLoading(false);
  //       props.history.push('/listarticles')
  //     }).catch((error) => setShowLoading(false));
  // };

  return (
    <div>
         
      <Jumbotron>
        <h1>Emergency Alert: </h1>
        <p>Alert details: </p>
      </Jumbotron>

      <Table striped bordered hover>

          <thead>

            <tr>

            <th>Created Time</th>

              <th>Message</th>

              <th>UserName</th>

            </tr>

          </thead>

          <tbody>

        

            

            {data.map((item, idx) => (

            <tr>

             <td>{item.created}</td>

             <td>{item.message}</td>
              
              <td>{item.Patients.username}</td>
             </tr>

            ))}

            

          </tbody>

        </Table>
    </div>
  );
}

export default withRouter(ShowAlert);
