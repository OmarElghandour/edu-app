import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import MainContent from './components/MainContent';
import Header from './components/Header'
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import AddProduct from './components/AddProduct';
import TeachersListing from './components/TeachersListing';
import VideoCall from './components/VideoCall';
import UserProfile from "./components/UserProfile";
import ScheduleSession from "./components/ScheduleSession";
import TeacherSessions from "./components/TeacherSessions";
import VideoCallClass from "./components/VideoCallClass"
import Register from './components/register';
require('dotenv').config();


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
          <div>
            <Switch>
              <Route path="/" exact component={MainContent} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <PrivateRoute path="/teachers-listing" exact component={TeachersListing} />
              <PrivateRoute path="/userProfile" exact component={UserProfile} />
              <Route path={'/schedule-session'} exact component={ScheduleSession} />
              <Route path="/add-product" component={AddProduct} />
              <Route path="/video-call/:roomId" component={VideoCall} />
              <Route path={'/teacherSessions/:teacherId'} exact component={TeacherSessions}  />
              <Route path={'/schedule-session'} exact component={ScheduleSession}  />
            </Switch>
          </div>
      </div>
    </Router>
  );
}


const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
)


export default App;


