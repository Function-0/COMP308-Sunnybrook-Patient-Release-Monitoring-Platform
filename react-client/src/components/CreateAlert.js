import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';

//
function CreateAlert(props) {
    //
    const username = props.screen;
    console.log('props.screen',props.screen)
    const [article, setArticle] = useState(
      {
        message: ""
      }
    );
    const [showLoading, setShowLoading] = useState(false);
    //
    const apiUrl = "/makealert"
    //
    const saveArticle = (e) => {
        setShowLoading(true);
        e.preventDefault();
       
        axios.post(apiUrl, article)
        .then((result) => {
            setShowLoading(false);
            console.log('results from save article:',result.data)
            props.history.push('/showarticle/' + result.data._id)

        }).catch((error) => setShowLoading(false));
    };
    //
    const onChange = (e) => {
        e.persist();
        setArticle({...article, [e.target.name]: e.target.value});
      }
    
    return (
        <div>
        <h2> Create an alert message {username} </h2>
        
        <Jumbotron>
            <Form onSubmit={saveArticle}>
              
              <Form.Group>
                <Form.Label> Enter Alert Message </Form.Label>
                <Form.Control as="textarea" rows="3" name="message" id="content" placeholder="Enter details" value={article.content} onChange={onChange} />
              </Form.Group>
                            
              <Button variant="primary" type="submit">
                Send Alert
              </Button>
            </Form>
          </Jumbotron>
        </div>
    );


}

export default withRouter(CreateAlert);
