import React from 'react';
import PropTypes from 'prop-types';

import FormTextField from '../FormTextField/FormTextField.jsx';


const FormRecommendationContent = ({content_day1, content_day2, content_day3, handleInputFieldChange, handleValidation, number_of_days, validationError}) => {
    return (
        <div>
            <FormTextField
                id="content_day1"
                handleInputFieldChange={handleInputFieldChange}
                handleOnBlur={handleValidation}
                label="Recommendation - Day 1"
                value={content_day1}
                validationError={validationError.content_day1}
            />

            {
                number_of_days > 1 &&
                <FormTextField
                    id="content_day2"
                    handleInputFieldChange={handleInputFieldChange}
                    handleOnBlur={handleValidation}
                    label="Recommendation - Day 2"
                    value={content_day2}
                    validationError={validationError.content_day2}
                />
            }

            {
                number_of_days > 2 &&
                <FormTextField
                    id="content_day3"
                    handleInputFieldChange={handleInputFieldChange}
                    handleOnBlur={handleValidation}
                    label="Recommendation - Day 3"
                    value={content_day3}
                    validationError={validationError.content_day3}
                />
            }
        </div>
    )
};

FormRecommendationContent.propTypes = {
    content_day1: PropTypes.string.isRequired,
    content_day2: PropTypes.string.isRequired,
    content_day3: PropTypes.string.isRequired,
    handleInputFieldChange: PropTypes.func.isRequired,
    handleValidation: PropTypes.func.isRequired,
    number_of_days: PropTypes.number.isRequired,
};

export default FormRecommendationContent;