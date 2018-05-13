import React from 'react';
import PropTypes from 'prop-types';

import DayDetails from '../DayDetails/DayDetails.jsx';

import './ContentSection.scss'

const ContentSection = ({ city, content, number_of_days }) => {
    console.log(number_of_days)
    let mClassColumns = '';
    if (number_of_days === 2) {
        mClassColumns = 'm6';
    } else if (number_of_days === 3) {
        mClassColumns = 'm4';
    }

    return (
        <div className="content-section">
            <h4>What to do in {city}</h4>

            <div className="row">
                <DayDetails
                    content={content[0]}
                    day={1}
                    mClassColumns={mClassColumns}
                />

                {
                    number_of_days > 1 &&

                    <DayDetails
                        content={content[1]}
                        day={2}
                        mClassColumns={mClassColumns}
                    />
                }
                {
                    number_of_days > 2 &&
                    <DayDetails
                        content={content[2]}
                        day={3}
                        mClassColumns={mClassColumns}
                    />
                }
            </div>
        </div>
    )
};

ContentSection.propTypes = {
    city: PropTypes.string.isRequired,
    content: PropTypes.arrayOf(PropTypes.string).isRequired,
    number_of_day: PropTypes.number.isRequired,
};

export default ContentSection;
