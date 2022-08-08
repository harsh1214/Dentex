import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { faUser, faTachometerAlt, faClinicMedical, faCalendarCheck, faUserInjured, faChartLine, faCog, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Font } from '@fortawesome/react-fontawesome';
import { AuthContext } from './helpers/AuthContext';
import axios from 'axios';
import './App.css';
import Appointment from './Pages/Appointment';
import Dashboard from './Pages/Dashboard';
import MyClinic from './Pages/MyClinic';
import Patient from './Pages/Patient';
import Setting from './Pages/Setting';
import NotFound from './Pages/NotFound';
import PageNotFound from './Pages/PageNotFound';
import AddAppointment from './Forms/AddAppointment';
import AddPatient from './Forms/AddPatient';
import PatientDetail from './Details/PatientDetail';
import AppointmentDetail from './Details/AppointmentDetail';
import DoctorDetail from './Details/DoctorDetail';
import Login from './Pages/Login';
import Forgotten from './Pages/Forgotten';
import Password from './Pages/Password';
import UpdateAppointment from './Update/UpdateAppointment';
import UpdatePatient from './Update/UpdatePatient';

function App() {

    const [authState, setAuthState] = useState({
        name: "",
        username: "",
        status: false
    });

    useEffect(() => {
        axios.get("http://localhost:3001/users/auth", {
            headers:{
                accessToken: localStorage.getItem('accessToken')
            }
        }).then((res) => {
            // console.log(res.data);
            if(res.data.error){
                setAuthState({...authState, status:false});
            }
            else{
                setAuthState({
                    name: res.data.name,
                    username: res.data.username,
                    status: true
                });
            }
        });        
    },[]);


    const logOut = () => {
        if (window.confirm("Do you want to Log Out ?")){
            localStorage.removeItem('accessToken');
            setAuthState({
                name: "",
                username: "",
                status:false
            });
        }
    };
    
    
    return (
        <div className="App">
            <AuthContext.Provider value={{authState, setAuthState}}>
            {!(authState.status) && (
                <Router>
                    {/* <Login /> */}
                    <Routes>
                        <Route path="/" exact element={<Login />} />
                        <Route path="/signUp" exact element={<Forgotten />} />
                        <Route path="/password/:username" exact element={<Password />} />
                        <Route path="*" exact element={<PageNotFound />} />
                    </Routes>
                </Router>
            )}
            {(authState.status) && (
                <Router>
                    <div className='Nav-Container'>
                        <div className='Sub-Nav-Container'>
                            <p className='Intro'>Dentex</p>
                            <Link className='Link' to='/'><Font className='Icon' icon={faTachometerAlt}></Font><p>Dashboard</p></Link>
                            <Link className='Link' to='/myClinic'><Font className='Icon' icon={faClinicMedical}></Font><p>My Clinic</p></Link>
                            <Link className='Link' to='/appointment'><Font className='Icon' icon={faCalendarCheck}></Font><p>Appointment</p></Link>
                            <Link className='Link' to='/patient'><Font className='Icon' icon={faUserInjured}></Font><p>Patient</p></Link>
                            <Link className='Link' to='/setting'><Font className='Icon' icon={faCog}></Font><p>Setting</p></Link>
                        </div>
                        <div className='Footer-Container'>
                            <p className='Link'>Username: {localStorage.getItem('Name')}</p>
                            <p className='Help Link-Hover'>Help<Font className='Icon' icon={faQuestion}></Font></p>
                            {(authState.status) && (
                                <a className='Link' onClick={logOut}><p><Font className='Icon' icon={faUser}></Font>Log Out</p></a>
                            )}
                        </div>
                    </div>
                    <Routes>
                        <Route path="/" exact element={<Dashboard />} />
                        <Route path="/myClinic" exact element={<MyClinic />} />
                        <Route path="/appointment" exact element={<Appointment />} />
                        <Route path="/patient" exact element={<Patient />} />
                        <Route path="/setting" exact element={<Setting />} />
                        <Route path="/appointment/addAppointment" exact element={<AddAppointment />} />
                        <Route path="/patient/addPatient" exact element={<AddPatient />} />
                        <Route path="/patient/patientDetail/:patientId" exact element={<PatientDetail />} />
                        <Route path="/appointment/appointmentDetail/:appointmentId" exact element={<AppointmentDetail />} />
                        <Route path="/patient/updatePatient/:patientId" exact element={<UpdatePatient />} />
                        <Route path="/appointment/updateAppointment/:appointmentId" exact element={<UpdateAppointment />} />
                        <Route path="/myClinic/myClinicDetail/:doctorsId" exact element={<DoctorDetail />} />
                        <Route path="*" exact element={<NotFound />} />
                        {/* <Route path="/login" exact element={<Login />} /> */}
                    </Routes>
                </Router>
            )}
            </AuthContext.Provider>
        </div>
    );
}

export default App;
/* {!localStorage.getItem("accessToken") && (
/*
<div className="profile-container">
<img src="./Avatar.png" alt="Profile" className='Avatar-Pic' />
<h3 className='Doctor-Name'>Dr.Mart Parker</h3>
<p className='Profession'>Dentist</p>
<span onClick={showBtn} ><Font className='Icon-Angle' icon={ faAngleDown }></Font></span>
</div>
*/
    /* faQuestion */ 
    /* {!localStorage.getItem("accessToken") && (
                <Router>
                    <Routes>
                        <Route path="/" exact element={<Login />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
                            {(!localStorage.getItem("accessToken")) && (
                                <Link className='Link' to='/Login'><p><Font className='Icon' icon={faUser}></Font>Login</p></Link>
                            )}
            )} 
                            {(localStorage.getItem("accessToken")) && ()} */