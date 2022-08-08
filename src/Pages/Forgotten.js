import React, { useState, useContext } from 'react';
import axios from "axios";
import { faUser, faLock, faPhoneSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Font } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
function Forgotten() {

    let navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [OTP, setOTP] = useState(0);
    const { setAuthState } = useContext(AuthContext);

    const getOTP = () => {
        const data = username;
        axios.put(`http://localhost:3001/users/authOTP/${data}`).then((res) => {
            console.log(res.data);
            if (res.data.error) {
                alert(res.data.error);
            }
            else {
                setUsername(res.data.username);
                setOTP(res.data.OTP);
                alert("OTP sent to email");
            }
        });
    };

    const submitOTP = () => {
        axios.get(`http://localhost:3001/users/checkOTP/${username}`).then((res) => {
            const dataOTP = res.data.OTP;
            if(res.data.error){
                alert(res.data.error);
            }
            else{
                if(!(dataOTP == OTP)){
                    alert("OTP in not Match");
                }
                else{
                    alert("OTP matched");
                    axios.put(`http://localhost:3001/users/changeOTP/${username}`); 
                    navigate(`/password/${username}`);
                }
            }
        });
    };

    return (

        <div className='login-signUp-container'>
            <div className='image-container'>
                <div className="contents">
                    <p className='head'>Dentex</p>
                    <p>Manage Your Practice with Dentex</p>
                    <button>Read more</button>
                </div>
            </div>
            <div className='loginContainer'>
                <div className='loginSubContainer'>
                    <div className='loginHeading'>
                    <h1 className='loginHeading-1'>Forgotten Password</h1>
                    </div>
                    <div className="loginForm">
                        <label htmlFor="username"><h4>Username</h4></label>
                        <Font className='username-icon' icon={faUser}></Font>
                        <input id="username" name="username" className="username" placeholder="Username" autoComplete='off'
                            onChange={(e) => { setUsername(e.target.value) }} value={username} />
                        <button type='submitLogin' onClick={getOTP} className='login'>Sent OTP</button>
                        <label htmlFor="userOTP"><h4>OTP</h4></label>
                        <Font className='username-icon' icon={faPhoneSquareAlt}></Font>
                        <input id="userOTP" name="userOTP" className="userOTP" placeholder="OTP" autoComplete='off'
                            onChange={(e) => { setOTP(e.target.value) }} />
                        <button type='submitLogin' onClick={submitOTP} className='login'>Check OTP</button>
                    </div>
                    <div className='links-login'>
                        <Link className='link-login' to='/'><p>-Go to Login Page</p></Link>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Forgotten;
/* <input type="button" value="Sign Up" className='signUpNavigate' onClick={Navigate("/signup")} /> */ 
/* <p>Username : </p>
<input type="text" name="userName" id="userName" onChange={(e) => { setUsername(e.target.value) }} value={username} />
<p>Password : </p>
<input type="password" name="userPassword" id="userPassword" onChange={(e) => { setPassword(e.target.value) }} value={password} />
<button onClick={login}>Login</button> */
// const submitSignUp = () => {
// const data = {
// name: name,
// username: newUserName,
// password: newPassword,
// email: email,
// status: status,
// };
// console.log(data);
// alert("here");
// axios.post("http://localhost:3001/users/signup", data).then((res) => {
// if (res.data.error) {
//     alert(res.data.error);
// }
// else {
//         localStorage.setItem("accessToken", res.data);
//         navigate('/');
//     }
//     navigate('/');
// });
// }

// const submitSignUp = () => {
    //     const data = {
    //         name: name,
    //         username: username,
    //         password: password,
    //         email: email,
    //         status: status,
    //     };
    //     console.log(data);
    //     alert("here");
    //     axios.post("http://localhost:3001/users/signup", data).then((res) => {
    //         if (res.data.error) {
    //             alert(res.data.error);
    //         }
    //         else {
    //             localStorage.setItem("accessToken", res.data);
    //             navigate('/');
    //         }
    //         navigate('/');
    //     });
    // }


            /* <div className='signUpContainer'>
            <form action='POST' className="signUpForm">
            <label htmlFor="name"><h4>Name</h4></label>
            <input id="name" name="name" className="name" placeholder="Name" onChange={(e) => { setName(e.target.value) }} />
            <label htmlFor="newUsername"><h4>Username</h4></label>
            <input id="newUsername" name="newUsername" className="newUsername" placeholder="Username" onChange={(e) => { setNewUserName(e.target.value) }} />
            <label htmlFor="newPassword"><h4>Password</h4></label>
            <input type="password" id="newPassword" name="newPassword" className="newPassword" placeholder="Password" onChange={(e) => { setNewPassword(e.target.value) }} />
            <label htmlFor="email"><h4>Email</h4></label>
            <input id="email" name="email" className="email" placeholder="email" onChange={(e) => { setEmail(e.target.value) }} />
            <label htmlFor="status"><h4>Status</h4></label>
        <input id="status" name="status" className="status" placeholder="status" onChange={(e) => { setStatus(e.target.value) }} />
        <button type='submitLogin' onClick={submitSignUp} className='login'>Login</button>
        </form>
        </div> */
        /* {(sessionStorage.getItem('flag')) && ( */
        /* )} */
        // )}
        //         {(sessionStorage.getItem('flag')) && (