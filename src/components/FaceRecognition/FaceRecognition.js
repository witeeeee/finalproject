import React from 'react';

const FaceRecognition = ({imageUrl}) => {
    return(
        <div className = 'center ma'>
            <div className='mt2'>
            <img src = {imageUrl} width= '500px' height = 'auto' alt = {''}></img>
            </div>
        </div>
    )
}

export default FaceRecognition;