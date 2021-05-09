import React from 'react';
import './faceDetection.css';



const FaceDetection = ({ imageURL, box }) => {
    return(
        <div className='center ma pa2'>
            <div className='absolute pa2 mt2'>
                <div id='predictionValue' >Found: [{box.name}] Accracy: [{box.predictionValue}] Id: [{box.id}]</div>
                <img id='inputimage' alt='' src={imageURL} width='600px' height= 'auto'/>
                <div id='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    )
}



export default FaceDetection;