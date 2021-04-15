
import { useParams, withRouter } from 'react-router-dom';

import React, { Component, useReducer }  from 'react';

function NurseLandingPage(props)
{


    return (
        <div>
            <img src={require=(process.env.PUBLIC_URL + "/sunnybrook-logo.jpg")}></img>
            <h3>Welcome Back Nurse firstName lastName!</h3>
            
        </div>
    );

}


export default withRouter(NurseLandingPage);






