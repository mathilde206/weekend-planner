import React from 'react';
import PropTypes from 'prop-types';

import Comment from '../Comment/Comment.jsx';

import './CommentsSection.scss';

class CommentsSection extends React.Component {
    state = {
        comments: [],
    };

    render() {
        return(
        <div className="container comments-section">
            <h5>Comments</h5>
            <hr />
            <Comment
                content="hello"
                timestamp="1st may"
                user="Mathilde"
            />
        </div>
        )
    }
}

CommentsSection.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CommentsSection;