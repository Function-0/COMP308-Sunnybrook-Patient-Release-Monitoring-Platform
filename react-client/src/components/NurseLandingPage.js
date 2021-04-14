
import { useParams, withRouter } from 'react-router-dom';

import React, { Component, useReducer }  from 'react';

function NurseLandingPage(props)
{


    return (
        <div>
            <h2> COMP308 Emerging Technology</h2>
            <h3>Welcome Back {useParams} </h3>
            
        </div>
    );

}


export default withRouter(NurseLandingPage);






