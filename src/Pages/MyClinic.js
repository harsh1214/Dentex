import React, { useEffect, useState } from "react";
import { faBell, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Font } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function MyClinic() {

    const [doctor, setDoctor] = useState([]);
    const [count, setCount] = useState(0);
    let navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3001/doctors/getDoctor").then((res) => {
            setDoctor(res.data);
        });
        axios.get("http://localhost:3001/doctors/totalDoctors").then((res) => {
            setCount(res.data);
        });
    }, []);


    return (
        <div className='Main-Container'>
            <div className='Heading-Container'>
                <h1>Doctor</h1>
                <Font icon={faBell} className='Notification-Icon'></Font>
            </div>
            <div className="ACP-container">
                <div className="first-ACP-container">
                    <p>Total Doctor: {count}</p>
                </div>
            </div>
            <div className="third-ACP-container">
                <table className="table-head">
                    <tr className="head-row">
                        <th>No</th>
                        <th>Doctor Name</th>
                        <th>Status</th>
                        <th>Email</th>
                        <th>Number</th>
                    </tr>
                    {doctor.map((val, key) => {
                        return (
                            <tr className="data-row" onClick={() => { navigate(`/myClinic/myClinicDetail/${val.doctorsId}`) }}>
                                <td className="doctorsId">{val.doctorsId}</td>
                                <td className="doctorName">{val.doctorName}</td>
                                <td className="email">{val.status}</td>
                                <td className="email">{val.email}   </td>
                                <td className="number">{val.number}</td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    )
}

export default MyClinic;

{/* <div className="second-ACP-container">
    <button onClick={() => { navigate(`/patient/addPatient`) }}>
        <Font icon={faPlusCircle} className='faPlusCircle-font'></Font>
        <span>Doctor</span>
    </button>
</div> */}