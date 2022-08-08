import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddPatient() {

    let Navigate = useNavigate();

    const initVal = {
        patientName: "",
        email: "",
        number: "",
        age: "",
        gender: "",
        allergies: "",
        notes: ""
    }

    const validationSchema = Yup.object().shape({
        patientName: Yup.string().required("Required!"),
        email: Yup.string("Invalid Email").required("Required!").email("Invalid Email"),
        number: Yup.string().min(10, "too short").max(10, "too big").required("Required!"),
        age: Yup.string().required("Required!"),
        gender: Yup.string().required("Required!"),
        allergies: Yup.string().required("Required!"),
        notes: Yup.string().required("Required!")
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/patients/addPatient", data, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((res) => {
            if(res.data.error){
                alert("Error");
            }
            else{
                Navigate("/patient");
            }
        }).catch((error) => {
            alert(error);
        });
    }


    return (
        <div className='Main-Container'>
            <div className='Form-Heading'>
                <h1>Patient Form</h1>
            </div>
            <div className="breadcrumb">
                <p className="breadcrumb-element breadcrumb-link" onClick={() => { Navigate(`/`) }}><span>Home</span></p>
                <p className="breadcrumb-element">\</p>
                <p className="breadcrumb-element breadcrumb-link" onClick={() => { Navigate(`/patient`) }}><span>Patient</span></p>
                <p className="breadcrumb-element">\</p>
                <p className="breadcrumb-element"><span>Patient Form</span></p>
            </div>
            <div className="form-container">
                <Formik initialValues={initVal} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form className="UserForm">

                        <label htmlFor="patientName"><h4>Patient Name<i className="important-mark">*</i></h4></label>
                        <Field id="patientName" name="patientName" className="patientName" placeholder="" />
                        <ErrorMessage name='patientName' component="span" />

                        <label htmlFor="email"><h4>Email<i className="important-mark">*</i></h4></label>
                        <Field id="email" name="email" className="email" type="email" />
                        <ErrorMessage name='email' component="span" />

                        <label htmlFor="number"><h4>Phone No<i className="important-mark">*</i></h4></label>
                        <Field id="number" name="number" className="number" type="number" />
                        <ErrorMessage name='number' component="span" />

                        <label htmlFor="age"><h4>Age<i className="important-mark">*</i></h4></label>
                        <Field id="age" name="age" className="age" type="age" />
                        <ErrorMessage name='age' component="span" />

                        <label htmlFor="gender" className="gender-container"><h4>Gender<i className="important-mark">*</i></h4></label>
                        <label className="gender-label">
                            <Field type="radio" value="male" id="gender" name="gender" className="gender" />
                            <p>Male</p>
                        </label>
                        <label className="gender-label">
                            <Field type="radio" value="female" id="gender" name="gender" className="gender" />
                            <p>Female</p>
                        </label>
                        <label className="gender-label">
                            <Field type="radio" value="other" id="gender" name="gender" className="gender" />
                            <p>Other</p>
                        </label>
                        <ErrorMessage name='gender' component="span" />

                        <label htmlFor="allergies"><h4>Allergies</h4><i>(If there isn't any allergies then enter none)</i></label>
                        <Field id="allergies" name="allergies" className="allergies" />
                        <ErrorMessage name='allergies' component="span" />

                        <label htmlFor="notes"><h4>Notes</h4><i>(If there isn't any notes then enter none)</i></label>
                        <Field id="notes" name="notes" className="notes" />
                        <ErrorMessage name='notes' component="span" />

                        <button type='submit' className='AddUserSubmitButton'>Add User</button>
                    </Form>
                </Formik>
            </div>
        </div>

    )
}

export default AddPatient;