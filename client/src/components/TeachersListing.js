import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import SideBar from "./SideBar";
import { Row, Container } from 'react-bootstrap';
import axios from "axios";


const TeachersListing = () => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
            getTeachersApi();
    }, []);


    const getTeachersApi = () => {
        axios(`${process.env.REACT_APP_SERVER_API}subscribers/teachers/`).then(res => {
            setTeachers(res.data)
        }).catch(err => {
            console.log(err);
        });
    };
    const truncate = (str) => {
        return str.length > 10 ? str.substring(0, 20) + "..." : str;
    }

    return (
        <div className="product-page">
            <Container>
                <Row>
                <SideBar />
                <div className="col-md-8">
                <ul className="all-teachers">
                {
                    teachers.length > 0 ?
                        teachers.map((teacher) => (
                            <li key={teacher.id} className="teacher">
                                <img src={teacher?.UserProfile?.user_img} />
                                <div className="teacher-details">
                                    <h4 className="tilte">{teacher?.UserProfile?.firstName} {teacher?.UserProfile?.lastName}</h4>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                                    <div className="rating">
                                        <FontAwesome name="fas fa-star" />
                                        <FontAwesome name="fas fa-star" />
                                        <FontAwesome name="fas fa-star" />
                                        <FontAwesome name="fas fa-star" />
                                    </div>
                                    <span>260 Reviews</span>
                                    <h5 className="price">30 usd / hour</h5>
                                    {/*<a className="button">Enroll now</a>*/}
                                    <Link className="button" to={`/teacherSessions/${teacher.id}`} >Enroll now</Link>
                                </div>
                            </li>
                        ))

                        : "no Teachres"
                }
            </ul>
            </div>
                </Row>
            </Container>
        </div>
    )



}

export default TeachersListing;
