import React from 'react';
import { BrowserRouter as Router, Switch, Route , useHistory , Redirect } from "react-router-dom";

const PrivateRoute = ({component : RenderedRoute , ...rest}) => {
    return (
        <Route 
            render={props => {     
                if(localStorage.getItem('login')){
                    return <RenderedRoute {...props} />                
                }else {
                   return <Redirect  to={{  pathname: "/login"}} />
                }
             }}
        />
    )
}

export default PrivateRoute;
