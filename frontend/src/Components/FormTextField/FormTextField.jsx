import React from "react";
import PropTypes from "prop-types";

const TextFormField = ({id, handleInputFieldChange, label, handleOnBlur, validationError, value}) => (
    <div className="row input-row">
        <div className="col s12 m4  offset-m1 form-label">
            <label className={validationError? "error" : ""} htmlFor={id}>{label} *</label>
        </div>

        <div className="col s12 m6">
            <input
                type="text"
                id={id}
                value={value}
                name={id}
                onChange={handleInputFieldChange}
                onBlur={handleOnBlur}
            />
            {
                validationError &&
                <p className="error">{validationError}</p>
            }

        </div>
    </div>
);

TextFormField.defaultTypes = {
    handleOnBlur: () => null
};

TextFormField.propTypes = {
    id: PropTypes.string.isRequired,
    handleInputFieldChange: PropTypes.func.isRequired,
    handleOnBlur: PropTypes.func,
    label: PropTypes.string.isRequired,
    validationError: PropTypes.string,
    value: PropTypes.string.isRequired,
};

export default TextFormField;

