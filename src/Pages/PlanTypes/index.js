import React, { useState, useEffect } from "react";
import axios from 'axios';

import logo from "../LandingPage/lyftron.png";
import "./styles.css";

const PlanTypes = () => {

    const [planTypes, setPlanTypes] = useState([]);
   
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
            
        const {  data } = await axios.get('http://localhost:8000/plan-types');
        setPlanTypes(data)
    }
    return (
        <div className="container-fluid">
            <div className="container">
	    
                <div className="d-flex justify-content-center h-100">
                
                    <div className="card m-auto w-25 bg-transparent">
                        <div className="row mb-2">
                            <div className="col-12 text-center">
                                <img src={logo} alt="lyftron" />
                            </div>
                        </div>
                        <div className="card-header border-bottom-">
                            <h3 className="text-center w-100">Lyftron Data</h3>
                        </div>
                          
                        <div className="card-body bg-white text-center">
                            
                            {
                                planTypes.map((planType, key) => {
                                    return (
                                        <div className="row justify-content-center my-3">
                                            <button key={key} type="submit" className="btn col-10 btn-bg">{planType.name}</button>
                                        </div>
                                    );
                                })
                            }
                        </div>

                    </div>
	
                </div>

            </div>
        </div>
    );
};

export default PlanTypes;
