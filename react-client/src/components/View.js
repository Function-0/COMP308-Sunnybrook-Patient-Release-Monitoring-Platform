import CreateArticle from './CreateArticle';
import CreateAlert from './CreateAlert';
import React, { useState } from 'react';
import dailyInfos from './ListDailyInfos'
//
import axios from 'axios';
//
function View (props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  
  const [dailyInfos, setDailyInfos] = useState('');
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable 
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get('/psignout');
      setScreen('auth2');
    } catch (e) {
      console.log(e);
    }
  };
  // called when user clicks on Get Data button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const verifyCookie = async () => {
    try {
      const res = await axios.get('/pwelcome');
      console.log(res.data)
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  //
  const listDailyInfos = (username) => {

    console.log('in listDailyInfos: ',username)
    setDailyInfos('n')

  }
  //
  const addMyDailyInfos = () => {
    console.log('in addMyDailyInfos')
    setDailyInfos('y')

  }

  const motivationVideo = () => {
    setArticle('video')
  }

  const createAlert = () => {
    setArticle('alert')
  }
  
  //
  return (
    <div className="App">

     <div>
            <p>{screen}</p>
            <p>{data}</p>
            <button onClick={verifyCookie}>Verify Cookie</button>
            <button onClick={createArticle}>Create Artivle</button>
            <button onClick={createAlert}>Create Alert</button>
            <button onClick={deleteCookie}>Log out</button>
            <button onClick={motivationVideo}>Motivation Video</button>
          </div>   
      {article === 'y' &&    
       <CreateArticle screen={screen} setScreen={setScreen} />
        }
        {article === 'alert' &&
       <CreateAlert screen={screen} setScreen={setScreen} />
        }
    </div>
  );
}

//
export default View;