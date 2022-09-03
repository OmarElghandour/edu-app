import React, {useEffect, useState} from 'react';
import Axios from "axios";
import { Link } from "react-router-dom";

const TeacherSessions = (props) => {
    const [teacherSessions, setTeacherSessions] = useState([])
    const {match: {params}} = props;
    const TeacherId = params.teacherId;
    useEffect(() => {
        Axios(`${process.env.REACT_APP_SERVER_API}token/teacherSessions/${TeacherId}`).then(res => {
            console.log(res.data);
            setTeacherSessions(res.data);
        }).catch(err => {
            console.log(err);
        });

    },[]);
    return(
        <div className={'container'}>
            {/*<div className={'row'}>*/}
            {
              teacherSessions.length > 0 ?  teacherSessions.map((session) =>
                    <div className={'row'}>
                        <h4>{session?.startAt}</h4>
                        <Link to={`/video-call/${session.session}`}>
                            Join Session
                        </Link>
                    </div>
                ) : "no session for this instructor"

            }
            </div>
        // </div>
        )
};
export default TeacherSessions;
