import React from 'react';
import PropTypes from 'prop-types';

import './Comment.scss';

const Comment = ({content, timestamp, user }) => {
    return(
        <div className="comment">
            <p>{content}</p>
            <small>By {user} | on {timestamp}</small>
        </div>
    )
};

Comment.propTypes = {
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
};

export default Comment;

//TODO: Add user profile pict (add user profile pict to user)
