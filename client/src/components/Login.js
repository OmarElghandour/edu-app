import React, { useState } from "react";
import { Link, Redirect ,useHistory } from "react-router-dom";
const axios = require('axios');

const Login = () => {
    const history = useHistory();
    const [state, setState] = useState({
        userName: "",
        password: ""
    });
    const handleChange = event => {
        const value = event.target.value;
        setState({...state, [event.target.name]: value});
    };
    const handleSubmit = event => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_SERVER_API}users/login` , {
            credential : state.userName,
            password : state.password
        }).then(function (response) {
            console.log(response);
            localStorage.setItem('login' , true);
            localStorage.setItem('loggedInUser' , JSON.stringify(response.data));
            history.push('/');
        }).catch(function (error) {
                console.log(error);
        });
    };

    return (
        <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="content-wrapper d-flex align-items-center auth">
                <div class="row flex-grow">
                    <div class="col-lg-4 mx-auto">
                        <div class="auth-form-light text-left p-5">
                            <div class="brand-logo">
                                <img src="../../assets/images/logo.svg" />
                            </div>
                            <h4>Hello! let's get started</h4>
                            <h6 class="font-weight-light">Sign in to continue.</h6>
                            <form class="pt-3">
                                <div class="form-group">
                                    <input type="email" 
                                        class="form-control form-control-lg" 
                                        id="exampleInputEmail1" 
                                        placeholder="Username" 
                                        name="userName"
                                        onChange={handleChange} 
                                        value={state.userName}  
                                    />
                                </div>
                                <div class="form-group">
                                    <input type="password" 
                                        value={state.password}
                                        onChange={handleChange}                                          
                                        class="form-control form-control-lg" 
                                        id="exampleInputPassword1" 
                                        placeholder="Password"
                                        name="password"
                                        />
                                </div>
                                <div class="mt-3">
                                    <a class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" 
                                    onClick={handleSubmit}
                                    >SIGN IN</a>
                                </div>
                                <div class="my-2 d-flex justify-content-between align-items-center">
                                    <div class="form-check">
                                        <label class="form-check-label text-muted">
                                            <input type="checkbox" class="form-check-input" /> Keep me signed in </label>
                                    </div>
                                    <a href="#" class="auth-link text-black">Forgot password?</a>
                                </div>
                                <div class="mb-2">
                                    <button type="button" class="btn btn-block btn-facebook auth-form-btn">
                                        <i class="mdi mdi-facebook me-2"></i>Connect using facebook </button>
                                </div>
                                <div class="text-center mt-4 font-weight-light"> Don't have an account? 
                                <Link className="text-primary" to={'/register'}>
                                 Create
                                </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}



export default Login;