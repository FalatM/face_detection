import React from 'react';
import Tilt from 'react-parallax-tilt';
import './logo.css';
import brain from './brain.png';

const Logo = () => {
    return(
        <div className='ma4 mt0'>
            <Tilt>
                <div id='tiltLogo' className="br2 shadow-1">
                    <img style={{paddingTop: '35px'}} alt='brain' src={brain}></img>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;