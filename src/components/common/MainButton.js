import React from 'react';

const MainButton = ({ text, onClick, className, icon }) => {
    return (
        <button className={`btn ${className}`} onClick={onClick}>
            <i className='material-icons'>{icon}</i>
            {text}
        </button>
    );
};

export default MainButton;
