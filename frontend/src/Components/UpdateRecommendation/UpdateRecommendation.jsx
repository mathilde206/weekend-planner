import React from 'react';
import PropTypes from 'prop-types';

class UpdateRecommendation extends React.Component {

    render() {
        const {
            url,
            params,
        } = this.props.match;

        const {
            slug
        } = params.slug;

        return (

            (url === '/create') ?
                <h1>Create A New Recommendation</h1> :
                <h1>Edit a Recommendation </h1>

    )
    }
}

export default UpdateRecommendation;