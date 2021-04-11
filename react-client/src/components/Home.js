
import { withRouter } from 'react-router-dom';

import React, { Component }  from 'react';

function Home(props)
{


    return (
        <div>
            <h2> COMP308 Emerging Technology</h2>
            <h3> Assignment #3 - Express - React with CRUD Operations</h3>
            <h4> Submitted by Shaminda Abeysekara,Student#301056885 and Sanjib Saha, Student #301100387</h4>
            <p>React front-end calls Express REST API to add, 
            list, update, or delete a student, create an course, etc.</p>
        </div>
    );

}


export default withRouter(Home);






