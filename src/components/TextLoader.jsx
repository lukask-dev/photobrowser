import React from 'react';

function TextLoader({ text, length }) {

    const textStyle = {
    };

    const placeHolderStyle = {
        backgroundColor: '#333',
        height: '2ch',
        borderRadius: '6px',
        width: `${length}ch`,
    };

    return (
        <div
            style={text ? textStyle : placeHolderStyle} >
            {text}
        </div>
    );
}

export default TextLoader;