import React, { useState } from "react";
import axios from 'axios';

import logo from "../LandingPage/lyftron.png";
import "./styles.css";
// DASHBOARDS

// Layout

const Register = () => {

    const initialState = {
        email: "",
        password: "",
    };
    const initialErrorState = {
        emailError: "",
        passwordError: "",
    };
    const [{ email, password }, setState] = useState(initialState);
    const [{ emailError, passwordError }, setError] = useState(initialErrorState);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        setState(
            prevState => ({ ...prevState, [name]: value })
        )
        
    }

    const handleSubmit = async (event) => {

        try {
            event.preventDefault();

                const {data} =await axios.post('http://localhost:8000/api/auth/register', {
                    email,
                    password,
                    is_active: 1,
                    is_staff: 1
                });
            
            setError(initialErrorState);
            
            window.location.href = '/#/plan-types';

        } catch (err) {
            
            if (err.response && err.response.status === 400) {
                
                if (err.response.data.email) {
                    const emailEr = err.response.data.email[0];
                    setError(
                    errors => ({ ...errors, emailError: emailEr })
                )
                }
                if (err.response.data.password) {
                    const passwordEr = err.response.data.password[0];
                    setError(
                    errors => ({ ...errors, passwordError: passwordEr })
                )
                }
			}
        }
        
    };
    return (
        <div className="container-fluid">
            <div className="container">
	    
                <div className="d-flex justify-content-center h-100">
                    <div className="row"></div>
                    <div className="card m-auto w-50 bg-transparent">
                        <div className="row mb-2">
                            <div className="col-12 text-center">
                                <img src={logo} alt="lyftron" />
                            </div>
                        </div>
                        <div className="card-header border-bottom-">
                            <h3 className="text-center w-100">Register</h3>
                        </div>
                          
                        <div className="card-body bg-white">

                            <form onSubmit={handleSubmit}>
  
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter email"
                                        name="email"
                                        onChange={handleInputChange}
                                        value={email}
                                        required
                                    />
                                    {emailError.length > 0 &&
                                        <span className="mb-4 text-center text-danger font-mono text-sm"> {emailError} </span>
                                    }
                                </div>
  
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {passwordError.length > 0 &&
                                        <span className="mb-4 text-center text-danger font-mono text-sm"> {passwordError} </span>
                                    }
                                </div>
  
                                <button type="submit" className="btn">Register</button>

                            </form>
                        </div>

                    </div>
	
                </div>

            </div>
        </div>
    );
};

export default Register;
