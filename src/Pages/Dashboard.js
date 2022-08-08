import React, { useEffect, useState } from "react";
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Font } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {

    const [appointment, setAppointment] = useState([]);
    const [totalAppointment, setTotalAppointment] = useState(0);
    const [countPatient, setCountPatient] = useState(0);
    let navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3001/appointments/todaysAppointment").then((res) => {
            setAppointment(res.data);
        });
        axios.get("http://localhost:3001/appointments/todaysTotalAppointment").then((res) => {
            setTotalAppointment(res.data);
        });
        axios.get("http://localhost:3001/patients/totalPatients").then((res) => {
            setCountPatient(res.data);
        });
    }, []);
    let n = 0;

    return (
        <div className='Main-Container'>
            <div className='Heading-Container'>
                <h1>Dashboard</h1>
                <Font icon={faBell} className='Notification-Icon'></Font>
            </div>
            <div className="dashboard-container">
                <div className="dashboard-count" onClick={() => { navigate(`/patient`) }}>
                    <p>Total Appointment :</p>
                    <p>{totalAppointment}</p>
                </div>
                <div className="dashboard-count" onClick={() => { navigate(`/patient`) }}>
                    <p>Total Patient :</p>
                    <p>{countPatient}</p>
                </div>
            </div>
            <div className="third-ACP-container">
                <table className="table-head">
                    <tr className="head-row">
                        <th>No</th>
                        <th>Patient Name</th>
                        <th>Doctor Name</th>
                        <th>Appointment Date</th>
                        <th>Appointment Time</th>
                        <th>Action</th>
                    </tr>
                    {appointment.map((val, key) => {
                        n++;
                        return (
                            <tr className="data-row" onClick={() => { navigate(`appointment/appointmentDetail/${val.appointmentId}`) }}>
                                <td className="appointmentId">{n}</td>
                                <td className="patientName">{val.patientName}</td>
                                <td className="doctorName">{val.doctorName}</td>
                                <td className="appointmentDate">{val.appointmentDate}</td>
                                <td className="appointmentTime">{val.appointmentTime}</td>
                                <td>
                                    <button>Update</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    )
}

export default Dashboard;