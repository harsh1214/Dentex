import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddAppointment() {

    let Navigate = useNavigate();

    const current = new Date();
    const date =  current.getDate()  + "-" + current.getMonth() + "-" + current.getFullYear();
    const [doctor, setDoctor] = useState([]);
  
    const initVal = {
        patientName: "",
        doctorName: "",
        appointmentDate: "",
        appointmentTime: "",
    }

    // console.log(date);
    const validationSchema = Yup.object().shape({
        patientName: Yup.string().required("Required!"),
        doctorName: Yup.string().required("Required!"),
        appointmentDate: Yup.date().required("Required!"),
        appointmentTime: Yup.string().required("Required!"),
    });    
    
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/appointments/addAppointment", data, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((res) => {
            if (res.data.error) {
                alert("Error: " + res.data.error);
            }
            else {
                Navigate("/appointment");
            }
        }).catch((error) => {
            alert(error);
        });
    }

    useEffect(() => {
        axios.get("http://localhost:3001/doctors/getDoctor").then((res) => {
            setDoctor(res.data);
        });
    }, []);

    return (
        <div className='Main-Container'>
            <div className='Form-Heading'>
                <h1>Appointment Form</h1>
            </div>
            <div className="breadcrumb">
                <p className="breadcrumb-element breadcrumb-link" onClick={() => { Navigate(`/`) }}><span>Home</span></p>
                <p className="breadcrumb-element">\</p>
                <p className="breadcrumb-element breadcrumb-link" onClick={() => { Navigate(`/appointment`) }}><span>Appointment</span></p>
                <p className="breadcrumb-element">\</p>
                <p className="breadcrumb-element"><span>Appointment Form</span></p>
            </div>
            <div className="form-container">
                <Formik initialValues={initVal} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form className="UserForm">

                        <label htmlFor="patientName"><h4>Patient Name<i className="important-mark">*</i></h4></label>
                        <Field id="patientName" name="patientName" className="patientName" placeholder="" />
                        <ErrorMessage name='patientName' component="span" />

                        <label htmlFor="doctorName"><h4>Doctor Name<i className="important-mark">*</i></h4></label>
                        <Field id="doctorName" name="doctorName" className="doctorName" as="select" component="select" placeholder="Select a Doctor">
                            <option className="disable" value="Select a Doctor">Select a Doctor</option>
                            {doctor.map((val, key) => {
                                return (
                                    <option className="doctorNameOption" value={val.doctorName}>{val.doctorName}</option>
                                );
                            })}
                        </Field>
                        <ErrorMessage name='doctorName' component="span" />

                        <label htmlFor="appointmentDate"><h4>Appointment Date<i className="important-mark">*</i></h4></label>
                        <Field id="appointmentDate" name="appointmentDate" className="appointmentDate" type="date" min={date} />
                        <ErrorMessage name='appointmentDate' component="span" />

                        <label htmlFor="appointmentTime"><h4>Appointment Time<i className="important-mark">*</i></h4></label>
                        <Field id="appointmentTime" name="appointmentTime" className="appointmentTime" type="time" />
                        <ErrorMessage name='appointmentTime' component="span" />

                        <button type='submit' className="Appointment-Button" >Add Appointment</button>
                    </Form>
                </Formik>
            </div>
        </div>

    )
}

export default AddAppointment;
// <label htmlFor="DoctorDoctorsId">Id : {val.doctorsId}
//     {/* <Field type="number" name="DoctorDoctorsId" className="DoctorDoctorsId" id="DoctorDoctorsId" value={val.doctorsId} /> */}
// </label>
// {doctor.map((val, key) => {
//     return (
//         <Field name="DoctorDoctorsId" className="DoctorDoctorsId" id="DoctorDoctorsId" value={val.doctorsId} />
//     );
// })}