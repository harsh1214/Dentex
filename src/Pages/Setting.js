import React from 'react';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Font } from '@fortawesome/react-fontawesome';

function Setting() {
    return (
        <div className='Main-Container'>
            <div className='Heading-Container'>
                <h1>Setting</h1>
                <Font icon={faBell} className='Notification-Icon'></Font>
            </div>
        </div>
    )
}

export default Setting;