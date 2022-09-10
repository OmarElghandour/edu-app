import React, { useState, useEffect } from "react";
import Axios from "axios";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';

const ScheduleSession = () => {
  const userId = JSON.parse(localStorage.getItem('loggedInUser')).userId;
  const [session, setSession] = useState({
    time: "",
    startAt: "",
    createdBy: userId
  });
  const [startDate, setStartDate] = useState(new Date());
  const [scheduleSessions, setScheduleSessions] = useState([]);
  const [savedSessions, setSavedSessions] = useState([]);
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    Axios.get(`${process.env.REACT_APP_SERVER_API}session/scheduledSessions`, { params: { user_id: currentUser.user.id } })
      .then(sessions => {
        console.log(sessions);
        setScheduleSessions(sessions.data);
        setSavedSessions(sessions.data);
      })
      .catch(err => { console.log(err) });
  }, []);

  useEffect(() => {
    console.log(scheduleSessions);
  }, [scheduleSessions]);




  const handelFormSubmission = (event) => {
    scheduleSessions.forEach(session =>
      session.id
    );
    var uniqueResultArrayObjOne = scheduleSessions.filter(function (objOne) {
      return !savedSessions.some(function (objTwo) {
        return objOne.start_date == objTwo.start_date;
      });
    });
    
    Axios.post(`${process.env.REACT_APP_SERVER_API}session/scheduleSessions`, uniqueResultArrayObjOne)
      .then(response => {
        console.log(response.data);
        setSavedSessions(oldArray => [...oldArray, ...response.data]);
      })
      .catch(error => console.log(error));
  };

  const updateStatus = (session) => {
    let newArr = [...scheduleSessions]; // copying the old datas array
    const selectedSession = newArr.find(x => x.start_date === session.start_date);
    setScheduleSessions(newArr);
    Axios.post(`${process.env.REACT_APP_SERVER_API}session/status`, {id: selectedSession.id, status : !selectedSession.status})
    .then(response => {
      console.log(response.data);
      setSavedSessions(oldArray => [...oldArray, ...response.data]);
    })
    .catch(error => console.log(error));

  }

  const addSession = (newValue) => {
    setStartDate(newValue);

    const sessionsList = [...scheduleSessions];
    const d = new Date(startDate.toISOString());
    d.setSeconds(0,0);
    let dateWitoutTimeZone = d.toString().slice(0, 24);
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!sessionsList.includes(startDate)) {
      const sessionDetails = {
        userId: currentUser?.user?.id,
        start_date: dateWitoutTimeZone
      };
      setScheduleSessions(oldArray => [...oldArray, sessionDetails]);
    }
  }

  return (

    <div className={'container page-layout'}>
      <h1>HEllllllllllll</h1>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="DateTimePicker"
          value={startDate}
          onChange={(newValue) => {
            setStartDate(newValue);
          }}
        />
      </LocalizationProvider>

      <button
        style={{ float: "right" }}
        className="add btn btn-gradient-primary font-weight-bold todo-list-add-btn"
        id="add-task"
        onClick={() => addSession()}
      >Add
      </button>


      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Recent Tickets</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th> Date </th>
                      <th> Status </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      scheduleSessions.length ?
                        scheduleSessions.map((session, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <div className="form-check">
                                  <p> {session.start_date}</p>
                                </div>
                                <i className="remove mdi mdi-close-circle-outline"></i>
                              </td>
                              <td>
                              <Switch 
                                {...label} 
                                defaultChecked={session.active ? true : false}
                                onChange={() => updateStatus(session)}
                              />
                              </td>
                            </tr>
                          )
                        }) : <tr></tr>
                    }
                  </tbody>
                </table>
                <button
                      style={{ float: "right" }}
                      className="add btn btn-gradient-primary font-weight-bold todo-list-add-btn"
                      id="add-task"
                      onClick={() => handelFormSubmission()}
                    >Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
};
export default ScheduleSession;



