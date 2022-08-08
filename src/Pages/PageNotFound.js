import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {  

    return (
        <div className='pageNotFound-1'>
            <div>
            <h1 className='pnf-heading'>Page Not Found</h1>
            <h3 className='pnf-link'>
                Go to the Home Page:
                <Link to='/'>Home Page</Link>
            </h3>
            </div>
        </div>
    );
}

export default PageNotFound;