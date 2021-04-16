
import { useParams, withRouter } from 'react-router-dom';
import React, { Component,useEffect, useState } from "react";
import axios from 'axios';


function ViewQuote(props)
{
    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = "/getquote";
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("------------------------");

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
            
            });
        };
        fetchData();
      }, []);
    
      

    return (
        <div>
            <img src={require=(process.env.PUBLIC_URL + "/sunnybrook-logo.jpg")}></img>
            <h3>Quote of the day!</h3>
            {data.map((item, idx) => (
            <h3>{item.message}</h3>
            ))}

        </div>
    );

}


export default withRouter(ViewQuote);