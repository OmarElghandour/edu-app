import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
const axios = require('axios');


const Register = () => {

    const history = useHistory();
    const [state, setState] = useState({
        userName: "",
        password: "",
        email: ""
    });
    const handleChange = event => {
        const value = event.target.value;

        console.log(value);
        setState({ ...state, [event.target.name]: value });
    };
    const handleSubmit = event => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_SERVER_API}users/register`, {
            userName: state.userName,
            password: state.password,
            email: state.email
        }).then(function (response) {
            console.log(response);
            history.push('/login')
        }).catch(function (error) {
            console.log(error);
        });
    };


    return (
            <><div class="container-scroller">
            <div class="container-fluid page-body-wrapper full-page-wrapper">
                <div class="content-wrapper d-flex align-items-center auth">
                    <div class="row flex-grow">
                        <div class="col-lg-4 mx-auto">
                            <div class="auth-form-light text-left p-5">
                                <div class="brand-logo">
                                    <img src="../../assets/images/logo.svg" />
                                </div>
                                <h4>New here?</h4>
                                <h6 class="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                                <form onSubmit={handleSubmit} class="pt-3">

                                    <h4>{JSON.stringify(state)}</h4>
                                    <div class="form-group">
                                        <input type="text" 
                                            onChange={handleChange} 
                                            value={state.userName}  
                                            class="form-control form-control-lg" 
                                            id="exampleInputUsername1" 
                                            name="userName"
                                            placeholder="Username" />
                                    </div>
                                    <div class="form-group">
                                        <input type="email" 
                                            value={state.email}
                                            onChange={handleChange}
                                            class="form-control form-control-lg" 
                                            id="exampleInputEmail1" 
                                            name="email"
                                            placeholder="Email" />
                                    </div>
                                    <div class="form-group">
                                        <input type="password"
                                             value={state.password}
                                             onChange={handleChange}  
                                             class="form-control form-control-lg" 
                                             id="exampleInputPassword1"
                                             name="password"
                                             placeholder="Password" />
                                    </div>
                                    <div class="mt-3">
                                        <a class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" 
                                            onClick={handleSubmit}
                                        
                                        >SIGN UP</a>
                                    </div>
                                    <div class="text-center mt-4 font-weight-light"> 
                                    Already have an account?
                                    <Link  className="text-primary" to={'/login'}>
                                        Login
                                    </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </>
    )
}

export default Register;