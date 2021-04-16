import React from 'react';
import Tilt from 'react-parallax-tilt';
import './logo.css';
import brain from './brain.png';

const Logo = () => {
    return(
        <div className='ma4 w-20  center mt0'>
            <Tilt>
                <div id='tiltLogo' className="br2 center shadow-1">
                    <img style={{padding: '35px'}} alt='brain' src={brain}></img>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;