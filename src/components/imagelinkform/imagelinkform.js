import React from 'react';
import './imagelinkform.css';

const ImageLinkForm = () => {
    return (
        <div>
            <p className = 'f3'>
                This will detect faces in a picture. Give it a try. 
            </p>
            <div className = "outerdiv"> 
                <div className = "pa4 br3 shadow-5 bb">
                    <input className = 'f4 pa2 w-70 center' type = 'text' />
                    <button className = 'w-30 grow f4 link ph3 pv2 dib white bg-light-purple'> Detect </button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;