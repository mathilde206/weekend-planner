import React from 'react';
import PropTypes from "prop-types";

const Alert = ({ alertTypes, alerts }) => (
    <div>
        <ul>
            {alerts.map(alert => {
            <li>{alert}</li>
        })}
        </ul>
    </div>
);

Alert.propTypes = {
    // alertType: PropTypes.oneOf(["danger", "warning"]).isRequired,
    alerts: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Alert;
