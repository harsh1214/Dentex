import React, { useEffect, useState } from "react";
import { faBell, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Font } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Patient() {

    const [patients, setPatients] = useState([]);
    const [count, setCount] = useState(0);
    let navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3001/patients/getPatient").then((res) => {
            setPatients(res.data);
        });
        axios.get("http://localhost:3001/patients/totalPatients").then((res) => {
            setCount(res.data);
        });
    }, []);

    const deletePatient = (data) => {
        if (window.confirm("Do you really want to Delete this Patient?")) {
            axios.delete(`http://localhost:3001/patients/byPatientId/delete/${data}`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }).then(() => {
                alert("Patient deleted");
                navigate("/patient");
                window.location.reload('off');
            }).catch((error) => {
                alert(error);
            });
        }
        else {
            navigate(`/patient`);
        }
    }

    return (
        <div className='Main-Container'>
            <div className='Heading-Container'>
                <h1>Patient</h1>
                <Font icon={faBell} className='Notification-Icon'></Font>
            </div>
            <div className="ACP-container">
                <div className="first-ACP-container">
                    <p>Total Patient: {count}</p>
                </div>
                <div className="second-ACP-container">
                    <button onClick={() => { navigate(`/patient/addPatient`) }}>
                        <Font icon={faPlusCircle} className='faPlusCircle-font'></Font>
                        <span>Patient</span>
                    </button>
                </div>
            </div>
            <div className="third-ACP-container">
                <table className="table-head">
                    <tr className="head-row">
                        <th>No</th>
                        <th>Patient Name</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th>Action</th>
                    </tr>
                    {patients.map((val, key) => {
                        return (
                            <tr className="data-row">
                                <td className="patientId" onClick={() => { navigate(`/patient/patientDetail/${val.patientId}`) }}>
                                    {val.patientId}
                                </td>
                                <td className="patientName" onClick={() => { navigate(`/patient/patientDetail/${val.patientId}`) }}>
                                    {val.patientName}
                                </td>
                                <td className="gender" onClick={() => { navigate(`/patient/patientDetail/${val.patientId}`) }}>
                                    {val.gender}
                                </td>
                                <td className="email" onClick={() => { navigate(`/patient/patientDetail/${val.patientId}`) }}>
                                    {val.email}
                                </td>
                                <td className="number" onClick={() => { navigate(`/patient/patientDetail/${val.patientId}`) }}>
                                    {val.number}
                                </td>
                                <td className="action-td">
                                    <button onClick={() => { navigate(`/patient/updatePatient/${val.patientId}`) }} className="update-btn">Update</button>
                                    <button onClick={(e) => { deletePatient(val.patientId) }} className="delete-btn">Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    )
}

export default Patient;