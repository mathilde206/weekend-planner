import React from 'react';
import PropTypes from 'prop-types';

const CreateCityForm = ({ country, currency, handleInputFieldChange, language }) => (
    <div>
        <div className="row input-row">
            <div className="col s12 m3 form-label">
                <label htmlFor="country">Country</label>
            </div>

            <div className="col s12 m6">
                <input
                    type="text"
                    id="title"
                    value={country}
                    name="country"
                    onChange={handleInputFieldChange}
                />
            </div>
        </div>
        <div className="row input-row">
            <div className="col s12 m3 form-label">
                <label htmlFor="currency">Currency</label>
            </div>

            <div className="col s12 m6">
                <input
                    type="type"
                    id="currency"
                    value={currency}
                    name="currency"
                    onChange={handleInputFieldChange}
                />
            </div>
        </div>
        <div className="row input-row">
            <div className="col s12 m3 form-label">
                <label htmlFor="language">Language</label>
            </div>

            <div className="col s12 m6">
                <input
                    type="type"
                    id="language"
                    value={language}
                    name="language"
                    onChange={handleInputFieldChange}
                />
            </div>
        </div>
    </div>
);

CreateCityForm.propTypes = {
    country: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    handleInputFieldChange: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
};

export default CreateCityForm;