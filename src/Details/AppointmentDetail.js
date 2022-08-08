import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AppointmentDetail() {

    let { appointmentId } = useParams();
    let Navigate = useNavigate();
    const [appointmentObj, setAppointmentObj] = useState({});

    useEffect(() => {
         axios.get(`http://localhost:3001/appointments/byAppointmentId/${appointmentId}`).then((res) => {
            setAppointmentObj(res.data);
         });
    });

    return (
        <div className='Main-Container'>
            <div className='Form-Heading'>
                <h1>Appointment Detail</h1>
            </div>
            <div className="breadcrumb">
                <p className="breadcrumb-element breadcrumb-link" onClick={() => { Navigate(`/`) }}><span>Home</span></p>
                <p className="breadcrumb-element">\</p>
                <p className="breadcrumb-element breadcrumb-link" onClick={() => { Navigate(`/appointment`) }}><span>Appointment</span></p>
                <p className="breadcrumb-element">\</p>
                <p className="breadcrumb-element"><span>Appointment Detail</span></p>
            </div>
            <div className='Post-Container'>
               <div className='Post-Name'>{appointmentObj.appointmentId}</div>
               <div className='Post-Phone'>{appointmentObj.patientName}</div>               
               <div className='Post-Email'>{appointmentObj.doctorName}</div>
               <div className='Post-Email'>{appointmentObj.appointmentDate}</div>
               <div className='Post-Email'>{appointmentObj.appointmentTime}</div>
          </div>
        </div>
    );
}

export default AppointmentDetail;
