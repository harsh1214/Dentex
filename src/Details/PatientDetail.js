import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PatientDetail() {

    let n = 0;
    let { patientId } = useParams();
    let Navigate = useNavigate();
    const [patientObj, setPatientObj] = useState({});
    const [appointmentObj, setAppointmentObj] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/patients/byPatientId/${patientId}`).then((res) => {
            setPatientObj(res.data);
        });
        axios.get(`http://localhost:3001/patients/getAppointmentByPatientId/${patientId}`).then((res) => {
            setAppointmentObj(res.data);
        });
    }, []);

    const deleteAppointment = (data) => {
        if (window.confirm("Do you really want to Delete " + data)) {
            axios.post("http://localhost:3001/appointments/byAppointmentId/delete/:appointmentId", data).then(() => {
                Navigate("/appointment");
            }).catch((error) => {
                alert(error);
            });
        }
        else {
            Navigate(`/appointment`);
        }
    }

    // console.log(patientObj);

    return (
        <div className='Main-Container'>
            <div className='Form-Heading'>
                <h1>Patient Detail</h1>
            </div>
            <div className="breadcrumb">
                <p className="breadcrumb-element breadcrumb-link" onClick={() => { Navigate(`/`) }}><span>Home</span></p>
                <p className="breadcrumb-element">\</p>
                <p className="breadcrumb-element breadcrumb-link" onClick={() => { Navigate(`/patient`) }}><span>Patient</span></p>
                <p className="breadcrumb-element">\</p>
                <p className="breadcrumb-element"><span>Patient Detail</span></p>
            </div>
            <div className='post-container'>
                <div className='post-subContainer-1'>
                    <div className='post-data'><p>Patient Id: {patientObj.patientId}</p></div>
                    <div className='post-data'><p>Email: {patientObj.email}</p></div>
                    <div className='post-data'><p>Age: {patientObj.age}</p></div>
                    <div className='post-data'><p>Number: {patientObj.number}</p></div>
                    <div className='post-data'><p>Gender: {patientObj.gender}</p></div>
                </div>
                <div className='post-subContainer-2'>
                    <div className='post-data'><p>Allergies: {patientObj.allergies}</p></div>
                    <div className='post-data'><p>Notes: {patientObj.notes}</p></div>
                </div>
            </div>
            <div className='appointment-table'>
                <table className="table-head">
                    <tr className="head-row">
                        <th>No</th>
                        <th>Doctor Name</th>
                        <th>Appointment Date</th>
                        <th>Appointment Time</th>
                        <th className="action-th">Action</th>
                    </tr>
                    {appointmentObj.map((val, key) => {
                        n++;
                        return (
                            <tr className="data-row">
                                <td onClick={() => { Navigate(`/appointment/appointmentDetail/${val.appointmentId}`) }} className="appointmentId">{n}</td>
                                <td onClick={() => { Navigate(`/appointment/appointmentDetail/${val.appointmentId}`) }} className="doctorName">{val.doctorName}</td>
                                <td onClick={() => { Navigate(`/appointment/appointmentDetail/${val.appointmentId}`) }} className="appointmentDate">{val.appointmentDate}</td>
                                <td onClick={() => { Navigate(`/appointment/appointmentDetail/${val.appointmentId}`) }} className="appointmentTime">{val.appointmentTime}</td>
                                <td className="action-td">
                                    <button onClick={() => { Navigate(`/`) }} className="update-btn">Update</button>
                                    <button onClick={deleteAppointment} className="delete-btn">Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    );
}

export default PatientDetail;
//{/* {patientObj.patientData.map((val, key) => {
//    return(
//        );
//    })} */}
//  onClick={() => { Navigate(`/appointment/appointmentDetail/${val.appointmentId}`) }}
//{/* <th>Patient Name</th>    */ }
//{/* <td onClick={() => { Navigate(`/appointment/appointmentDetail/${val.appointmentId}`) }} className="patientName">{val.patientName}</td> */ }