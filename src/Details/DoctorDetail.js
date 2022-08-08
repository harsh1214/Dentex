import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AppointmentDetail() {

    let { doctorsId } = useParams();
    let Navigate = useNavigate();
    const [DoctorObj, setDoctorObj] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/doctors/byDoctorId/${doctorsId}`).then((res) => {
            setDoctorObj(res.data);
        });
    });

    return (
        <div className='Main-Container'>
            <div className='Form-Heading'>
                <h1>My Clinic Detail</h1>
            </div>
            <div className="breadcrumb">
                <p className="breadcrumb-element breadcrumb-link" onClick={() => { Navigate(`/`) }}><span>Home</span></p>
                <p className="breadcrumb-element">\</p>
                <p className="breadcrumb-element breadcrumb-link" onClick={() => { Navigate(`/myClinic`) }}><span>My Clinic</span></p>
                <p className="breadcrumb-element">\</p>
                <p className="breadcrumb-element"><span>My Clinic Detail</span></p>
            </div>
            <div className='ACP-Data-Container'>
                <div className='ACP-Data-Items'>
                    <p>Doctor Id: {DoctorObj.doctorsId}</p>
                </div>
                <div className='ACP-Data-Items'>
                    {DoctorObj.doctorName}
                </div>
                <div className='ACP-Data-Items'>
                    {DoctorObj.email}
                </div>
                <div className='ACP-Data-Items'>
                    {DoctorObj.number}
                </div>
                <div className='ACP-Data-Items'>
                    {DoctorObj.status}
                </div>
            </div>
        </div>
    );
}

export default AppointmentDetail;
