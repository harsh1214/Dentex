import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {  

    return (
        <div className='pageNotFound'>
            <h1 className='pnf-heading'>Page Not Found</h1>
            <h3 className='pnf-link'>
                Go to the Home Page:
                <Link to='/'>Home Page</Link>
            </h3>
        </div>
    );
}

export default NotFound;