
import { withRouter } from 'react-router-dom';

import React, { Component }  from 'react';

function Home(props)
{
    return (
        <div style={{textAlign:"center",fontFamily:"verdana"}}> 
             
             <h1>Welcome to Sunnybrook</h1>
        </div>
    );
}


export default withRouter(Home);






