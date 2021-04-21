import React from 'react';
import Tilt from 'react-parallax-tilt';
import './logo.css';
import brain from './techBrain.png';



const Logo = () => {
    return(
        <div className='ma4 w-20 h-20 center mt0'>
            <Tilt className="parallax-effect" perspective={600}>
                <div id='tiltLogo' className="inner-element br2 center shadow-1">
                    <img style={{padding: '70px'}} alt='brain' src={brain}></img>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;