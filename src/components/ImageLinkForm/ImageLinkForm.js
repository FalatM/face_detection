import React from 'react';
import './ImageLinkForm.css';



const ImageLinkForm = () => {
    return(
        <div>
            <p className='f3'>
                {'Face Detector'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type='tex' />
                <button className='w-300 grow f4 link pa3 pv2 dib'>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;