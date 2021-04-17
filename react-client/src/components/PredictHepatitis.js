import { withRouter } from "react-router-dom";
import axios from 'axios';
import React, { Component, useEffect, useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

function PredictHepatitis(props) {
  const [hepatitisFeatures, setVitals] = useState({
    Age: "3",
    Sex: "1",
    Steroid: "2",
    Antivirals: "2",
    Fatigue: "2",
    Malaise: "2",
    Anorexia: "2",
    Liver_big: "2",
    Liver_firm: "2",
    Spleen_palpable: "2",
    Spiders: "2",
    Ascites: "2",
    Varices: "2",
    Bilurubin: "3",
    Alk_phosphate: "3",
    Sgot: "3",
    Albumin: "3",
    Protime: "3",
    Histology: "2"
  });

  const checkboxFeatures = [
    {
      "name": "Steroid",
      "label": "Do you take steroids?"
    },
    {
      "name": "Antivirals",
      "label": "Do you take antivirals?"
    },
    {
      "name": "Fatigue",
      "label": "Are you tired often?"
    },
    {
      "name": "Malaise",
      "label": "Do you feel uncomfortable often?"
    },
    {
      "name": "Anorexia",
      "label": "Are you anorexic?"
    },
    {
      "name": "Liver_big",
      "label": "Do you have a big liver?"
    },
    {
      "name": "Liver_firm",
      "label": "Do you have a firm liver?"
    },
    {
      "name": "Spleen_palpable",
      "label": "Is your spleen palpable?"
    },
    {
      "name": "Spiders",
      "label": "Do you have spider veins?"
    },
    {
      "name": "Ascites",
      "label": "Do you have ascites?"
    },
    {
      "name": "Varices",
      "label": "Do you have varices?"
    },
    {
      "name": "Histology",
      "label": "Do you have histology?"
    }
  ];

  const inputboxFeatures = [
    {
      "name": "Bilurubin",
      "label": "How much Bilurubin is in you?"
    },
    {
      "name": "Alk_phosphate",
      "label": "How much Alkaline Phosphatase is in you?"
    },
    {
      "name": "Sgot",
      "label": "What is your SGOT Blood Test result?"
    },
    {
      "name": "Albumin",
      "label": "How much Albumin is in you?"
    },
    {
      "name": "Protime",
      "label": "What is your Prothrombin Time?"
    },
  ]

  const [showLoading, setShowLoading] = useState(false);
  const [predictColor, setPredictColor] = useState("Red");
  const apiUrl = "/predicthepatitis";
  const [data, setData] = useState([]);

  const predict = async (e) => {
    setShowLoading(true);
    e.preventDefault();
      axios
        .post(apiUrl, hepatitisFeatures)
        .then((result) => {
          console.log("result.data:", result.data);
          setData(result.data);
          setShowLoading(false);
          console.log(result.data.isDie)
          if (result.data.isDie) {
            setPredictColor("Red")
          } else {
            setPredictColor("Green")
          }
        })
        .catch((error) => {
          console.log("error in fetchData:", error);
        });
  };

  const onChange = (e) => {
    e.persist();
    setVitals({ ...hepatitisFeatures, [e.target.name]: e.target.value });
  };

  const onChangeCheckbox = (e) => {
    e.persist();
    setVitals({ ...hepatitisFeatures, [e.target.name]: e.target.checked ? '1' : '2' });
  };

  const onChangeRadioSex = (e) => {
    e.persist();
    // when clicking the same radio button too fast it crashes
    try {
      setVitals({ ...hepatitisFeatures, [e.target.name]: e._targetInst.memoizedProps["data-value"] === 'Male' ? '1' : '2' });
    }
    catch {}
  };

  return (
    <div>
      <div>
        <img
          src={(require = process.env.PUBLIC_URL + "/sunnybrook-logo.jpg")}
        ></img>
      </div>
      <div>
        <h1 class="text-center">Predict Hepatitis</h1>
      </div>
      <Jumbotron>
        <Form onSubmit={predict}>
        <Form.Group>
            <div class="d-flex">
              <div class="col-sm-8">
              <Form.Label>Age</Form.Label>
              </div>
              <div class="ml-3 col-sm-4">
                <Form.Control
                  type="Number"
                  name="Age"
                  onChange={onChange}
                  step="0.01"
                  required
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group onClick={onChangeRadioSex}>
            <div class="d-flex">
              <div class="col-sm-8">
              <Form.Label>Sex</Form.Label>
              </div>
              <div class="ml-3 col-sm-4">
              <Form.Check name="Sex" inline label="Male" type="radio" data-value="Male"/>
              <Form.Check name="Sex" inline label="Female" type="radio" data-value="Female" />
              </div>
            </div>
          </Form.Group>
          {
           checkboxFeatures.map((feature) => (
              <Form.Group>
              <div class="d-flex">
                <div class="col-sm-8">
                <Form.Label>{feature.label}</Form.Label>
                </div>
                <div class="ml-3 col-sm-4">
                  <Form.Check 
                    name={feature.name}
                    inline
                    onClick={onChangeCheckbox}
                  />
                </div>
              </div>
            </Form.Group>
            ))}
          {
          inputboxFeatures.map((feature) => (
            <Form.Group>
            <div class="d-flex">
              <div class="col-sm-8">
              <Form.Label>{feature.label}</Form.Label>
              </div>
              <div class="ml-3 col-sm-4">
                <Form.Control
                  type="Number"
                  name={feature.name}
                  onChange={onChange}
                  step="0.01"
                  required
                />
              </div>
            </div>
          </Form.Group>
          ))}
          <Button variant="success" type="submit" block>
            Predict
          </Button>
        </Form>
      <div class="d-flex flex-column align-items-center mt-3">
      {showLoading === false ? (
        <div>        
          <h2>Hepatitis Prediction Results</h2>      
          <p class="font-weight-bold" style={{color: predictColor}}>{data.result}</p>               
        </div>
        ) : (
        <div>     
          {showLoading && (
            <div class="mt-2">
            <Spinner animation="border" role="status">
                          
              <span className="sr-only">Waiting for results...</span>
                        
            </Spinner>
            </div>
          )}
        </div>
      )}
      </div>
      </Jumbotron>
    </div>
  );
}

export default withRouter(PredictHepatitis);
