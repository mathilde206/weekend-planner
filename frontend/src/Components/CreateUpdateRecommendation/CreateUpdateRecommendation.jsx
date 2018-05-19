import React from 'react';
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'

import axios from 'axios';

import CreateCityForm from '../CreateCityForm/CreateCityForm.jsx';

import "./CreateUpdateRecommendation.scss"

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class CreateUpdateRecommendation extends React.Component {

    state = {
        budget: "Cheap",
        city: "",
        cityExists: true,
        content_day1: "",
        content_day2: "",
        content_day3: "",
        country: "",
        currency: "",
        error: "",
        language: "",
        draft: false,
        number_of_days: 1,
        title: '',
    };


    doesCityExist = (event) => {
        event.preventDefault();
        const value = event.target.value;

        //TODO: check if the city exists when the backend is ready (needs to be async)
    };

    handleInputFieldChange = (event) => {
        event.preventDefault();

        const name = event.target.name
        const value = event.target.value

        this.setState({
            [name]: value
        })
    };

    handleNumberOfDaysChange = (event) => {
        const value = event.target.value;

        this.setState({
            number_of_days: Number(value)
        })
    };

    handleBudgetStatusChange = (event) => {
        const value = event.target.value;

        this.setState({
            budget: value
        })
    };

    handleDraftStatusChange = () => {
        this.setState({
            draft: !this.state.draft
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const {
            budget,
            cityExists,
            content_day1,
            content_day2,
            content_day3,
            country,
            currency,
            language,
            draft,
            number_of_days,
            title,
        } = this.state;

        const form = {
            budget,
            cityExists,
            content_day1,
            content_day2,
            content_day3,
            country,
            currency,
            language,
            draft,
            number_of_days,
            title,
        };

        if (!cityExists) {
            this.addCity()
                .then(city => {
                    form[city] = city;
                    axios.post(this.props.apiURL, form)
                        .then(({slug}) => <Redirect to={`"/recommendations/details/${slug}"`}/>)
                        .catch((error) => this.setState({
                            error,
                        }))
                })
                .catch(error => {
                    this.setState({
                        error,
                    })
                })
        }

        form[city] = this.state.city;
        console.log(form)
        console.log(this.props.apiURL)
        axios.post(this.props.apiURL, form)
            .then((response) => console.log(response) || <Redirect to={`"/recommendations/details/${slug}"`}/>)
            .catch((error) => this.setState({
                error,
            }))
    };
    //TODO: Sluuuug ou est tu :(


    addCity = () => {
        const form = {
            name: this.state.city,
            country: this.state.country,
            currency: this.state.currency,
            language: this.state.language,
        };

        axio.post('/api/cities/create', form)
    };

    render() {
        const {
            budget,
            city,
            cityExists,
            content_day1,
            content_day2,
            content_day3,
            country,
            currency,
            draft,
            language,
            number_of_days,
            title
        } = this.state;

        const {
            action,
            apiURL,
        } = this.props;

        return (
            <div className="container create-recommendation">
                <h1>Create A New Recommendation</h1>
                <form
                    className='recommendation-form'
                >
                    <div className="row input-row">
                        <div className="col s12 m3">
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={this.handleDraftStatusChange}
                                />
                                <span>Draft</span>
                            </label>
                        </div>
                    </div>

                    <div className="row input-row">
                        <div className="col s12 m3 form-label">
                            <label>Title</label>
                        </div>

                        <div className="col s12 m6">
                            <input
                                type="text"
                                id="title"
                                value={title}
                                name="title"
                                onChange={this.handleInputFieldChange}
                            />
                        </div>
                    </div>

                    <div className="row input-row">
                        <div className="col s12 m3 form-label">
                            <label>Budget</label>
                        </div>
                        <div className="col s12 m6">
                            <select onChange={this.handleBudgetStatusChange}>
                                <option value="Cheap">$</option>
                                <option value="Affordable">$$</option>
                                <option value="Expensive">$$$</option>
                                <option value="Very_Expensive">$$$$</option>
                            </select>
                        </div>
                    </div>

                    <div className="row input-row">
                        <div className="col s12 m3 form-label">
                            <label>City</label>
                        </div>

                        <div className="col s12 m6">
                            <input
                                type="text"
                                id="city"
                                value={city}
                                name="city"
                                onChange={this.handleInputFieldChange}
                                onBlur={this.doesCityExist}
                            />
                        </div>
                    </div>


                    {
                        !cityExists &&
                        <CreateCityForm
                            country={country}
                            currency={currency}
                            handleInputFieldChange={this.handleInputFieldChange}
                            language={language}
                        />
                    }

                    <div className="row input-row">
                        <div className="col s12 m3 form-label">
                            <label>Number of Days</label>
                        </div>
                        <div className="col s12 m6">
                            <select onChange={this.handleNumberOfDaysChange}>
                                <option value="1">1 Day</option>
                                <option value="2">2 Days</option>
                                <option value="3">3 Days</option>
                            </select>
                        </div>
                    </div>

                    <div className="row input-row">
                        <div className="col s12 m3 form-label">
                            <label htmlFor="content-day1">Recommendation - Day 1</label>
                        </div>

                        <div className="col s12 m6">
                            <textarea
                                id="content-day1"
                                className="materialize-textarea"
                                name="content_day1"
                                onChange={this.handleInputFieldChange}
                                value={content_day1}
                            />
                        </div>
                    </div>

                    {
                        number_of_days > 1 &&
                        <div className="row input-row">
                            <div className="col s12 m3 form-label">
                                <label htmlFor="content-day2">Recommendation - Day 2</label>
                            </div>

                            <div className="col s12 m6">
                            <textarea
                                id="content-day2"
                                className="materialize-textarea"
                                name="content_day2"
                                onChange={this.handleInputFieldChange}
                                value={content_day2}
                            />
                            </div>
                        </div>
                    }

                    {
                        number_of_days > 2 &&
                        <div className="row input-row">
                            <div className="col s12 m3 form-label">
                                <label htmlFor="content-day3">Recommendation - Day 3</label>
                            </div>

                            <div className="col s12 m6">
                            <textarea
                                id="content-day3"
                                className="materialize-textarea"
                                name="content_day3"
                                onChange={this.handleInputFieldChange}
                                value={content_day3}
                            />
                            </div>
                        </div>
                    }
                    <div className="row">
                        <div className="col s12">
                            <button
                                type="submit"
                                onClick={this.handleSubmit}
                                className="btn btn-default waves-effect waves-light btn-large"
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}

CreateUpdateRecommendation.propTypes = {
    action: PropTypes.string.isRequired,
    apiURL: PropTypes.string.isRequired,
};

export default CreateUpdateRecommendation;


//TODO: Add image upload
//TODO: Add validation with JS
