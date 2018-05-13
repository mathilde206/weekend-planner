import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import axios from 'axios';

import Pagination from '../Pagination/Pagination.jsx';

class HomeExplore extends React.Component {
    state = {
        data: [],
        loading: true,
        page: 1,
        totalPages:0,
    };

    componentWillMount() {
        this.getData(this.state.page);
    }

    getData = (page) => {
        const url = `/api/recommendations/?page=${page}`;
        this.setState({
            loading: true
        });

        axios.get(url)
            .then((response) => {
                this.setState({
                    count: response.data.count,
                    data: response.data.results,
                    loading: false,
                    totalPages: Math.ceil(response.data.count / 5),
                })
                //TODO: Would be nice to refactor to get total pages from backend rather than hard coded ...

            })
            .catch((error) => {
                this.setState({
                    loading: false,
                })
            })
    }

    handlePageChange = (page) => {
        this.setState({
            page
        });
        this.getData(page);
    }

    render() {
        const {
            data,
            loading,
            page,
            totalPages,
        } = this.state;


        if (loading) {
            return <h1>Loading</h1>
        }

        if (data.length > 0) {
            return (
                <div>
                    <h4>Here are the most popular destinations</h4>
                    <div className='row'>
                        <div className='col s12 m7'>
                            {/*PLACEHOLDER FOR THE GMAP*/}

                        </div>
                        <div className='col s12 m5'>
                            <ul className="collection">
                                {data.map(recommendation => (
                                    <li
                                        key={recommendation.slug}
                                        className="collection-item avatar"
                                    >
                                        {
                                            recommendation.image &&
                                            <img src="{recommendation.image.url}" alt="" class="circle"/>
                                        }

                                        <span className="title">{recommendation.title}</span>
                                        <p>By {recommendation.user}<br/>
                                            <Link to={`details/${recommendation.slug}`}>See more...</Link>
                                        </p>
                                        <small>Views: {recommendation.views} | Likes: {recommendation.likes}</small>
                                    </li>
                                ))}
                            </ul>

                            <Pagination
                                activePage={page}
                                handlePageChange={this.handlePageChange}
                                totalPages={totalPages}
                            />
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <h4>No Recommendation to show at this time...</h4>
        )
    }
}

export default HomeExplore;

//TODO: HomeExplore
//-add the google map
//- improve look&feel
//- Add some transitions on the pagination because right now it's ugly !!