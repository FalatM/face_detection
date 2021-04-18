import React from 'react';

const FaceDetection = ({ imageURL }) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
            <img alt='' src={imageURL} width='600px' height= 'auto'/>
            </div>
        </div>
    )
}




export default FaceDetection;