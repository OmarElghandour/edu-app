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
      setTeachers(res.data);
      console.log(res);
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
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Recent Tickets</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Instructor </th>
                        <th> Skills </th>
                        <th> Status </th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachers.length ? teachers.map(teacher => {
                        return (
                          <tr key={teacher.id}>
                            <td>
                              <img
                                src={teacher?.UserProfile?.user_img}
                                className="me-2"
                                alt="image"
                              />{" "}
                              {teacher?.UserProfile?.firstName} {teacher?.UserProfile?.lastName}
                            </td>
                            <td> 
                              {teacher.UserCategories.map(category => {
                                return <span className="badge badge-gradient-success" key={category.id}> {category.Category.name}  </span>
                              })}  
                            </td>
                            <td>
                              <label className="badge badge-gradient-success">
                                DONE
                              </label>
                            </td>
                          </tr>
                        )
                      }) : <tr></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default TeachersListing;
