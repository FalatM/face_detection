import React from 'react';
import './ImageLinkForm.css';



const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return(
        <div>
            <p className='f2 lightest-blue'>
                {'Face Detection API'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center input-reset ba bg-black lightest-blue' onKeyPress={onSubmit} type='tex' placeholder='Image URL' onChange={onInputChange} />
                <button className='w-300 grow f4 link pa3 pv2 dib' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;