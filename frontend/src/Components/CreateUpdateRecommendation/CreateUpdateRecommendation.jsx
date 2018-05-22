import React from 'react';
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'

import axios from 'axios';

import FormCityCreate from '../FormCityCreate/FormCityCreate.jsx';
import FormTextField from '../FormTextField/FormTextField.jsx';
import FormSelectInput from '../FormSelectInput/FormSelectInput.jsx';
import FormRecommendationContent from '../FormRecommendationContent/FormRecommendationContent.jsx';

import "./CreateUpdateRecommendation.scss";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class CreateUpdateRecommendation extends React.Component {
    state = {
        budget: "Cheap",
        city: "",
        cityId: 'no city yet',
        content_day1: "",
        content_day2: "",
        content_day3: "",
        country: "",
        currency: "",
        errors: [],
        formErrors: {
            city: '',
            content_day1: '',
            content_day2: '',
            country: '',
            currency: '',
            language: '',
            title: '',
        },
        language: "",
        draft: false,
        number_of_days: 1,
        title: '',
    };

    componentWillMount() {
        if (this.props.action === 'update') {
            this.getUpdateData()
        }
    }


    doesCityExist = (event) => {
        event.preventDefault();
        const value = event.target.value;

        if (this.state.city === '') {
            let errors = Object.assign({}, this.state.formErrors);
            errors[name] = "This field is required";
            this.setState({
                formErrors: errors
            })
        } else {
            axios.get(`/api/cities/?search=${value}`)
                .then((response) => {
                        if (response.data.length > 0 && response.data[0].pk) {
                            this.setState({
                                cityId: response.data[0].pk,
                            })
                        } else {
                            this.setState({
                                cityId: "",
                            })
                        }
                    }
                ).catch((error) => {
                this.setState({
                    errors: error,
                })
            })
        }
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

        const form = {
            budget: this.state.budget,
            city: this.state.cityId,
            content_day1: this.state.content_day1,
            content_day2: this.state.content_day2,
            content_day3: this.state.content_day3,
            draft: this.state.draft,
            number_of_days: this.state.number_of_days,
            title: this.state.title,
        };

        if (this.state.cityId === "") {
            this.addCity()
                .then(({data}) => {
                    form.city = data.pk;
                    axios.post(this.props.apiURL, form)
                        .then(({data}) => {
                            this.props.history.push(`details/${data.slug}`)
                        })
                        .catch((error) => {
                            this.setState({
                                errors: error,
                            })
                        })
                })
                .catch((error) => {
                    this.setState({
                        errors: error,
                    })
                })
        } else {
            axios.post(this.props.apiURL, form)
                .then(({data}) => this.props.history.push(`details/${data.slug}`))
                .catch((error) => {
                    this.setState({
                        errors: error,
                    })
                })
        }
    };

    handleValidation = (event) => {
        event.preventDefault();
        const name = event.target.name;

        if (this.state[name] === '') {
            let errors = Object.assign({}, this.state.formErrors);
            errors[name] = "This field is required";
            this.setState({
                formErrors: errors
            })
        }
    };


    addCity = () => {
        const form = {
            name: this.state.city,
            country: this.state.country,
            currency: this.state.currency,
            language: this.state.language,
        };

        return axios.post('/api/cities/create/', form)
    };

    getUpdateData = (recommendationSlug) => {
        axios.get(`/api/recommendations/${recommendationSlug}`)
            .then(({data}) => {
                this.setState({
                    budget: data.budget,
                    city: data.city.name,
                    cityId: data.city.id,
                    content_day1: data.content_day1,
                    content_day2: data.content_day2,
                    content_day3: data.content_day3,
                    draft: data.draft,
                    number_of_days: data.number_of_days,
                    title: data.title,
                })
            })
    };

    isValidForSubmission = () => {
        const emptyField = !this.state.city || !this.state.title || !this.state.city || !this.state.content_day1;
        const daysMissing = (this.state.number_of_days === 3 && (!this.state.content_day2 || !this.state.content_day3)) ||
            (this.state.number_of_days === 2 && !this.state.content_day2);
        const cityInfoMissing = !this.state.cityId && (!this.state.country || !this.state.currency || !this.state.language);
        if (emptyField || daysMissing || cityInfoMissing) {
            return false
        }

        return true;
    };


    render() {
        const {
            budget,
            city,
            cityId,
            content_day1,
            content_day2,
            content_day3,
            country,
            currency,
            draft,
            errors,
            formErrors,
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
                        <div className="col s3 offset-s1">
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={this.handleDraftStatusChange}
                                />
                                <span>Draft</span>
                            </label>
                        </div>
                    </div>

                    <FormTextField
                        id="title"
                        handleInputFieldChange={this.handleInputFieldChange}
                        handleOnBlur={this.handleValidation}
                        label="Title"
                        validationError={formErrors.title}
                        value={title}
                    />

                    <FormSelectInput
                        handleSelectChange={this.handleBudgetStatusChange}
                        label="Budget"
                        options={[
                            {
                                label: "$",
                                value: "Cheap"
                            },
                            {
                                label: "$$",
                                value: "Affordable",
                            },
                            {
                                label: "$$$",
                                value: "Expensive",
                            },
                            {
                                label: "$$$$",
                                value: "Very_Expensive",
                            },
                        ]}/>

                    <FormTextField
                        id="city"
                        handleInputFieldChange={this.handleInputFieldChange}
                        label="City"
                        handleOnBlur={this.doesCityExist}
                        value={city}
                    />

                    {
                        !cityId &&
                        <FormCityCreate
                            country={country}
                            currency={currency}
                            handleInputFieldChange={this.handleInputFieldChange}
                            handleValidation={this.handleValidation}
                            language={language}
                            validationError={formErrors}
                        />
                    }

                    <FormSelectInput
                        handleSelectChange={this.handleNumberOfDaysChange}
                        label="Number of Days"
                        options={[
                            {
                                label: "1 Day",
                                value: "1",
                            },
                            {
                                label: "2 Days",
                                value: "2",
                            },
                            {
                                label: "3 Day",
                                value: "3",
                            },
                        ]}
                    />

                    <FormRecommendationContent
                        content_day1={content_day1}
                        content_day2={content_day2}
                        content_day3={content_day3}
                        handleInputFieldChange={this.handleInputFieldChange}
                        handleValidation={this.handleValidation}
                        number_of_days={number_of_days}
                        validationError={formErrors}
                    />


                    <div className="row">
                        <div className="col s3 offset-s4">
                            <button
                                type="submit"
                                onClick={this.handleSubmit}
                                className={
                                    this.isValidForSubmission()
                                        ? "btn btn-default waves-effect waves-light btn-large"
                                        : "btn btn-default btn-large disabled"

                                }
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
    action: PropTypes.oneOf(["create", "update"]).isRequired,
    apiURL: PropTypes.string.isRequired,
};

export default CreateUpdateRecommendation;


//TODO: Add image upload
