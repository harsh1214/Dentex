import React, { useState, useContext } from 'react';
import axios from "axios";
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Font } from '@fortawesome/react-fontawesome';
import { Link, useParams, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../helpers/AuthContext';

function Password() {

    let { username } = useParams();
    let navigate = useNavigate();
    const [password, setPassword] = useState("");
    // const { setAuthState } = useContext(AuthContext);

    const submitPassword = () => {
        const data = `{"username": "${username}", "password": "${password}"}`;
        axios.put(`http://localhost:3001/users/changePassword/${data}`).then((res) => {
            if (res.data.error) {
                alert(res.data.error);
                navigate('/signUp')
            }
            else {
                alert(res.data);
                navigate('/');
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
                        <h1 className='loginHeading-1'>Change Password</h1>
                    </div>
                    <div className="loginForm">
                        <label htmlFor="password"><h4>Password</h4></label>
                        <Font className='username-icon' icon={faLock}></Font>
                        <input id="password" name="password" className="password" placeholder="Password" autoComplete='off'
                            onChange={(e) => { setPassword(e.target.value) }} />
                        <button type='submitLogin' onClick={submitPassword} className='login'>Change Password</button>
                    </div>
                    <div className='links-login'>
                        <Link className='link-login' to='/'><p>-Go to Login Page</p></Link>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Password;