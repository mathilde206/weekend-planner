import React from 'react';
import PropTypes from 'prop-types';

import FormTextField from '../FormTextField/FormTextField.jsx';

const FormCityCreate = ({ country, currency, handleInputFieldChange, handleValidation, language, validationError}) => (
    <div>
        <FormTextField
            id="country"
            handleInputFieldChange={handleInputFieldChange}
            label="Country"
            validationError={validationError.country}
            handleOnBlur={handleValidation}
            value={country}
        />
        <FormTextField
            id="currency"
            handleInputFieldChange={handleInputFieldChange}
            label="Currency"
            validationError={validationError.currency}
            handleOnBlur={handleValidation}
            value={currency}
        />
        <FormTextField
            id="language"
            handleInputFieldChange={handleInputFieldChange}
            label="Language"
            validationError={validationError.language}
            handleOnBlur={handleValidation}
            value={currency}
        />
    </div>
);

FormCityCreate.propTypes = {
    country: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    handleInputFieldChange: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
    validationError: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FormCityCreate;