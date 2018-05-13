import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import axios from 'axios';

import DetailsInfoWell from '../DetailsInfoWell/DetailsInfoWell.jsx';
import ContentSection from '../ContentSection/ContentSection.jsx';

class RecommendationDetails extends React.Component {
    state = {
        author: '',
        budget: '',
        city: '',
        content: [],
        errors: [],
        loading: true,
        number_of_days: 1,
        recommendationViews: 0,
        recommendationLikes: 0,
        title: '',
    };

    componentWillMount() {
        this.getData()
    }

    getData() {
        const url = `api/recommendations/${this.props.match.params.slug}`;
        this.setState({
            loading: true,
        });

        axios.get(url)
            .then((response) => {
                const result = response.data;

                this.setState({
                    author: result.user,
                    budget: result.budget,
                    city: result.city,
                    content: [
                        result.content_day1,
                        result.content_day2,
                        result.content_day3,
                    ],
                    loading: false,
                    number_of_days: result.number_of_days,
                    recommendationViews: result.views,
                    recommendationLikes: result.likes,
                    title: result.title,
                })
            })
            .catch((errors) => {
                this.setState({
                    errors
                })
            })
    }

    render() {
        const {
            author,
            budget,
            city,
            content,
            errors,
            loading,
            number_of_days,
            recommendationLikes,
            recommendationViews,
            title,
        } = this.state;
        console.log(number_of_days)

        if(loading) {
            return <h1>Loading</h1>
        }

        if(errors.length > 0){
            {errors.map(error => (<h1>{error}</h1>))}
        }

        return (
            <div className="container">
                <h1>{title}</h1>

                <DetailsInfoWell
                    author={author}
                    budget={budget}
                    city={city.name}
                    number_of_days={number_of_days}
                    likes={recommendationLikes}
                    views={recommendationViews}
                />

                <ContentSection
                    city={city.name}
                    content={content}
                    number_of_days={number_of_days}
                />
            </div>
        )

    }
}

export default RecommendationDetails;

//Todo: Components to create:
//- Add Image + title on image ? New component
//- Content
//- UserActions
//- Comment => Comments will load its own data
// Add country details in the DetailsInfoWell