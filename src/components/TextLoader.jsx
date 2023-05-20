import React from 'react';

function TextLoader({ text, length }) {

    const placeHolderStyle = {
        backgroundColor: '#333',
        height: '2ch',
        borderRadius: '6px',
        width: `${length}ch`,
    };

    return (
        <div
            style={text ? null : placeHolderStyle} >
            {text}
        </div>
    );
}

export default TextLoader;