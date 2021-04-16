import { useParams, withRouter } from "react-router-dom";
import React, { useState } from 'react';
import AddQuote from "./AddQuote";
import AddVitals from "./AddVitals";
import VitalSignsHistory from "./VitalSignsHistory";



function NurseLandingPage(props) {
    const { screen, setScreen } = props;
    const [data, setData] = useState();

    const [article, setArticle] = useState('');

    const addVitals = () => {
        setArticle('vitals')
    
      }
      const addQuote = () => {
        setArticle('quote')
    
      }

      const vitalHistory = () => {
        setArticle('history')
    
      }

  return (
    <div className="App">

       <div>
        <p>{screen}</p>
        <p>{data}</p>

        <button onClick={addQuote}>Add Daily Quote</button>
        <button onClick={addVitals}>Add Vitals</button>
        <button onClick={vitalHistory}>Vital Signs History</button>
        

        <br></br>

      </div>
      
       {article === "quote" && (
        <AddQuote screen={screen} setScreen={setScreen} />
      )}{article === "vitals" && (
        <AddVitals screen={screen} setScreen={setScreen} />
      )}{article === "history" && (
        <VitalSignsHistory screen={screen} setScreen={setScreen} />
      )}
    </div>
  );
}

export default withRouter(NurseLandingPage);
