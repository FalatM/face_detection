import React from 'react';
import './ImageLinkForm.css';



const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return(
        <div>
            <p className='f3'>
                {'Face Detector'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange} />
                <button className='w-300 grow f4 link pa3 pv2 dib' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;