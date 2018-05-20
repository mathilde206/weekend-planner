import React from 'react';
import PropTypes from 'prop-types';

const FormSelectInput = ({handleSelectChange, label, options}) => {

    return (
        <div className="row input-row">
            <div className="col s12 m4 form-label">
                <label>{label}</label>
            </div>
            <div className="col s12 m6">
                <select onChange={handleSelectChange}>
                    {options.map( option => <option key={option.label} value={option.value}>{option.label}</option> )}
                </select>
            </div>
        </div>
    )
};

FormSelectInput.propTypes = {
    handleSelectChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FormSelectInput;