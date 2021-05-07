import React from 'react';
import './faceDetection.css';

const FaceDetection = ({ imageURL, box, value }) => {
    return(
        <div className='center ma pa2'>
            <div className='absolute mt2'>
            <img id='inputimage' alt='' src={imageURL} width='600px' height= 'auto'/>
            <div id='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
                <div className='pa2'>
                    <div id='boxvalues'>
                        <div id='concept_name'>Face</div>
                        <div id='concept_prediction' src={value}></div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}




export default FaceDetection;