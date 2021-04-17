import { useParams, withRouter } from "react-router-dom";
import React, { useState } from "react";
import AddQuote from "./AddQuote";
import AddVitals from "./AddVitals";
import VitalSignsHistory from "./VitalSignsHistory";
import ViewQuote from "./ViewQuote";

import axios from 'axios';


function NurseLandingPage(props) {
  const { screen, setScreen } = props;
  const [data, setData] = useState();

  const [article, setArticle] = useState("");

  const addVitals = () => {
    setArticle("vitals");
  };
  const addQuote = () => {
    setArticle("quote");
  };

  const vitalHistory = () => {
    setArticle("history");
  };

  const viewQuote = () => {
    setArticle("view");
  };

  const viewAlert = () => {
    setArticle("alert");
  };

  const deleteCookie = async () => {
    try {
      await axios.get("/signout");
      setScreen("auth");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <div>
        <p>{screen}</p>
        <p>{data}</p>

        <button onClick={addQuote}>Add Daily Quote</button>
        <button onClick={addVitals}>Add Vitals</button>
        <button onClick={vitalHistory}>Vital Signs History</button>       
        <button onClick={viewQuote}>View Quote</button>
        <button onClick={viewAlert}>Show Emergency Alert</button>
        <button onClick={deleteCookie}>Log out</button>

      </div>

      {article === "quote" && (
        <AddQuote screen={screen} setScreen={setScreen} />
      )}
      {article === "vitals" && (
        <AddVitals screen={screen} setScreen={setScreen} />
      )}
      {article === "history" && (
        <VitalSignsHistory screen={screen} setScreen={setScreen} />
      )}{article === "view" && (
        <ViewQuote screen={screen} setScreen={setScreen} />
      )}{article === "viewAlert" && (
        <ViewQuote screen={screen} setScreen={setScreen} />
      )}
   
    </div>
  );
}

export default withRouter(NurseLandingPage);
