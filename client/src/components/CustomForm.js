import React, { useState } from "react";
import { Redirect ,useHistory } from "react-router-dom";
const axios = require('axios');

const CustomForm = () => {
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
        axios.post(`${process.env.REACT_APP_SERVER_API}subscribers/login` , {
            credential : state.userName,
            password : state.password
        }).then(function (response) {
            console.log(response);
            localStorage.setItem('login' , true);
            localStorage.setItem('loggedInUser' , JSON.stringify(response.data));
            history.push('/')
        }).catch(function (error) {
                console.log(error);
        });
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                userName
        <input
                    type="text"
                    name="userName"
                    value={state.userName}
                    onChange={handleChange}
                />
            </label>
            <label>
            password
        <input
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                />
            </label>

            <input type="submit" />
        </form>
        
    );
}

export default CustomForm;
