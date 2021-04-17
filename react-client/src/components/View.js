import CreateAlert from './CreateAlert';
import AddMyDailyInfos from './AddMyDailyInfos';
import ListDailyInfos from './ListDailyInfos';
import ViewQuote from "./ViewQuote";
import PredictHepatitis from "./PredictHepatitis";


import MotivationVideo from './MotivationVideo';
import React, { useState } from 'react';
//
import axios from 'axios';
//
function View (props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //
  const [article, setArticle] = useState('');
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
  // const listArticles = (username) => {

  //   console.log('in listCourses: ',username)
  //   //setArticle('n')

  // }
  //
  const createArticle = () => {
    console.log('in createCourse')
    setArticle('y')

  }

  const motivationVideo = () => {
    setArticle('video')
  }

  const createAlert = () => {
    setArticle('alert')
  }
  
  
  const createDaily = () => {
    setArticle('info')
  }

  const listDaily = () => {
    setArticle('list')
  }

  const viewQuote = () => {
    setArticle("view");
  };

  const predict = () => {
    setArticle("predict");
  };
  //
  return (
    <div className="App">

     <div>
            <p>{screen}</p>
            <p>{data}</p>

            <button onClick={createAlert}>Create Alert</button>
            <button onClick={deleteCookie}>Log out</button>
            <button onClick={motivationVideo}>Motivation Video And Games</button>
            <button onClick={createDaily}>Create Daily Info</button>
            <button onClick={listDaily}>List Daily Info</button>
            <button onClick={viewQuote}>View Quote</button>
            <button onClick={predict}>Predict Hepatitis</button>


          </div>   
      {article === 'info' &&    
       <AddMyDailyInfos screen={screen} setScreen={setScreen} />
        }
        {article === 'list' &&    
       <ListDailyInfos screen={screen} setScreen={setScreen} />
        }
        {article === 'alert' &&
       <CreateAlert screen={screen} setScreen={setScreen} />
        }
        
         {article === 'video' &&
       <MotivationVideo screen={screen} setScreen={setScreen} />
        }{article === "view" && (
          <ViewQuote screen={screen} setScreen={setScreen} />
        )}
        {article === "predict" && (
          <PredictHepatitis screen={screen} setScreen={setScreen} />
        )}
         
    </div>
  );
}

//
export default View;