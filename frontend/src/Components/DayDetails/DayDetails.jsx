import React from 'react';
import PropTypes from 'prop-types';

const DayDetails = ({ content, day, mClassColumns }) => {

    return (
        <div className={`col s12 ${mClassColumns}`}>
            <h5>Day {day}</h5>
            <hr />
            <p>{content}</p>
        </div>
    )
};

DayDetails.propTypes = {
    content: PropTypes.string.isRequired,
    day: PropTypes.number.isRequired,
    mClassColumns: PropTypes.string.isRequired,
}

export default DayDetails