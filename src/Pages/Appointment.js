import React, { useEffect, useState } from "react";
import { faBell, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Font } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Appointment() {

    const [appointment, setAppointment] = useState([]);
    const [count, setCount] = useState(0)
    let navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3001/appointments/getAppointment").then((res) => {
            setAppointment(res.data);
        });
        axios.get("http://localhost:3001/appointments/totalAppointments").then((res) => {
            setCount(res.data);
        });
    }, []);

    // const deleteAppointment = window.confirm("Do you really want to Sign Out?");
    // if(deleteAppointment == true){
    //     alert('Hey There!');
    // }

    const deleteAppointment = (data) => {
        if (window.confirm("Do you really want to Delete " + data)) {
            axios.delete(`http://localhost:3001/appointments/byAppointmentId/delete/${data}`, {
                headers:{
                    accessToken: localStorage.getItem("accessToken")
                }
            }).then(() => {
                alert("Appointment deleted");
                navigate("/appointment");
                window.location.reload('off');
            }).catch((error) => {
                alert(error);
            });
        }
        else {
            navigate(`/appointment`);
        }
    }

    return (
        <div className='Main-Container'>
            <div className='Heading-Container'>
                <h1>Appointment</h1>
                <Font icon={faBell} className='Notification-Icon'></Font>
            </div>
            <div className="ACP-container">
                <div className="first-ACP-container">
                    <p>Total Appointment: {count}</p>
                </div>
                <div className="second-ACP-container">
                    <button onClick={() => { navigate(`/appointment/addAppointment`) }}>
                        <Font icon={faPlusCircle} className='faPlusCircle-font'></Font>
                        <span>Appointment</span>
                    </button>
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
                        <th className="action-th">Action</th>
                    </tr>
                    {appointment.map((val, key) => {
                        key++;
                        return (
                            <tr className="data-row">
                                <td className="appointmentId" onClick={() => { navigate(`/appointment/appointmentDetail/${val.appointmentId}`) }}>
                                    {key}
                                </td>
                                <td className="patientName" onClick={() => { navigate(`/appointment/appointmentDetail/${val.appointmentId}`) }}>
                                    {val.patientName}
                                </td>
                                <td className="doctorName" onClick={() => { navigate(`/appointment/appointmentDetail/${val.appointmentId}`) }}>
                                    {val.doctorName}
                                </td>
                                <td className="appointmentDate" onClick={() => { navigate(`/appointment/appointmentDetail/${val.appointmentId}`) }}>
                                    {val.appointmentDate}
                                </td>
                                <td className="appointmentTime" onClick={() => { navigate(`/appointment/appointmentDetail/${val.appointmentId}`) }}>
                                    {val.appointmentTime}
                                </td>
                                <td className="action-td">
                                    <button onClick={() => { navigate(`/appointment/updateAppointment/${val.appointmentId}`) }} className="update-btn">Update</button>
                                    <button onClick={(e) => {deleteAppointment(val.appointmentId)}} className="delete-btn">Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    )
}

export default Appointment;
// <div className="" onClick={() => { navigate(`/byAppointmentId/${val.appointmentId}`) }}>
//     <div className="appointmentId"> {val.appointmentId} </div>
//     <div className="patientName"> {val.patientName} </div>
//     <div className="doctorName"> {val.doctorName} </div>
//     <div className="appointmentDate"> {val.appointmentDate} </div>
//     <div className="appointmentTime"> {val.appointmentTime} </div>
// </div>