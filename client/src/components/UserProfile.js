import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { Dropdown, Form } from "react-bootstrap";
import e from "cors";

const UserProfile = () => {
    const imageUpload = useRef();
    const [profileForm, setProfileForm] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        user_img: "",
        website: "",
        
        userId : null,
        categories: []
    });
    const [defaultSkills, setDefaultSkills] = useState([]);
    const [skills, setSkills] = useState([]);
    const userId = JSON.parse(localStorage.getItem('loggedInUser')).userId;
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `${process.env.REACT_APP_SERVER_API}subscribers/userDetails/${userId}`,
            );
            let userData = result.data.userData.UserProfile;
            fillFormData(userData);
        };
        const getCategories = async () => {
            const res = await axios(`${process.env.REACT_APP_SERVER_API}category/`);
            setDefaultSkills(res.data);
        };
        fetchData();
        getCategories();
    }, []);

    useEffect(() => {
        setProfileForm({ ...profileForm, categories: skills });
    }, [skills]);

    const handleChange = event => {
        const value = event.target.value;
        setProfileForm({ ...profileForm, [event.target.name]: value });
    };
    const fillFormData = userData => {
        console.log(userData);

        setProfileForm({
            ...profileForm,
            firstName: userData.firstName,
            lastName: userData.lastName,
            phoneNumber: userData.phoneNumber,
            user_img: userData.user_img,
            website: userData.website,
            userId : userData.user_id
        });
    };
    const onButtonClick = () => {
        imageUpload.current.click();
    };
    const handelSelectedSkills = (event) => {
        if (event.target.checked) {
            if (skills.findIndex(x => x.id === event.target.value) === -1) {
                setSkills([...skills, event.target.value]);
            }
        } else {
            setSkills(skills.filter(item => item !== event.target.value));
        }
    };
    const onImageUpload = event => {
        const file = event.target.files[0];
        const reader = new FileReader();
        const url = reader.readAsDataURL(file);
        reader.onloadend = () => {
            setProfileForm({ ...profileForm, user_img: reader.result });
        };
    };
    const updateUserProfile = () => {
        console.log(profileForm);
        let apiUrl = `${process.env.REACT_APP_SERVER_API}subscribers/userProfile/create/${userId}`;
        if(profileForm.userId) {
            apiUrl = `${process.env.REACT_APP_SERVER_API}subscribers/userProfile/update/${userId}`;                                                                                  
        }   

        axios.post(apiUrl, profileForm)
        .then(response => console.log(response))
        .catch(error => console.log(error));
    };

    const submitForm = event => {
        event.preventDefault();
        updateUserProfile();
    };

    return (
        <div className={'userProfile'}>
            <h4 className={'title'}>User profile works</h4>
            <div className={'container'}>
                <form onSubmit={submitForm}>
                    <div className={'row'}>

                        <div className={'col-md-6'}>
                            <img onClick={onButtonClick} width={'200px'} height={'200px'} src={profileForm.user_img} alt={''} />
                            <input ref={imageUpload} name={'user_img'} value="" type='file' id='single' onChange={onImageUpload} />
                            <div className="countries">
                                <h4 className="title">Specialist</h4>
                                <ul className="navbar-sidebar">
                                    {defaultSkills.length > 0 ? defaultSkills.map((type) => (
                                        <li key={type.id}>
                                            <label className="checkbox-btn">{type.name}
                                                <input id={`custom-inline-${type.id}-1`} type="checkbox" value={type.id} onChange={handelSelectedSkills} />
                                                <span className="checkmark" />
                                            </label>
                                        </li>

                                    )) : null}

                                </ul>
                            </div>
                        </div>

                        <div className={'col-md-6'}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">first Name</label>
                                <input className={'form-control'} type={'text'} value={profileForm.firstName} name={'firstName'} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Last Name</label>
                                <input className={'form-control'} value={profileForm.lastName} type={'text'} name={'lastName'} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Phone Number</label>
                                <input className={'form-control'} value={profileForm.phoneNumber} type={'text'} name={'phoneNumber'} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">website</label>
                                <input className={'form-control'} value={profileForm.website} type={'text'} name={'website'} onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            {/* <pre>
        <code>
          {profileForm && JSON.stringify(profileForm, null, 4)}
          {profileForm && JSON.stringify(skills, null, 4)}
          {profileForm && JSON.stringify(defaultSkills, null, 4)}
        </code>
      </pre> */}
        </div>

    );
};
export default UserProfile
