import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import './DetailsInfoWell.scss'

const DetailsInfoWell = ({
                             author,
                             budget,
                             city,
                             likes,
                             number_of_days,
                             views
                         }) => {
    return (
        <div className="row details-info-well">
            <div className="col s12">
                <div className="card">
                    <div className="card-content">
                        <h5> {city} in {number_of_days} day{number_of_days>1? 's':''}</h5>
                        <p>Budget: {budget}</p>
                        <p>By {author}</p>
                        <p>{likes} Likes </p>
                        <p>{views} Views</p>
                    </div>
                </div>
            </div>
        </div>)};

DetailsInfoWell.propTypes = {
    author: PropTypes.string.isRequired,
    budget: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    number_of_days: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
}

export default DetailsInfoWell;