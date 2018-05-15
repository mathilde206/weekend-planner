# The Weekend Planner
 
## Overview

### What is this app for?

This app will provide travel recommendations for short periods (weekends) and sell travel planning services.   

### What does it do?
Users will be able to explore recommendations filtered on cities and on durations. 
They will have the possibility to contribute by adding their own recommendations.
Finally, they can buy travel planning servies from myself. 

## Features

### Existing Features


### Features to Implement
 - Explore Recommendations:
    - Read the details
    - Comment a recommendation
    - Vote for a recommendation
    - Nice to Have: bookmark a recommendation
    - Search for recommendations filtering by city, upvotes, number of views

- Add Recommendatons:
    - Create new recommendations when authenticated
    - Add information about a city if the city is not already in the db.

- Authentication 
    - login
    - register
    - logout
    - reset their password
    - create a profile

- E-Commerce
    - buy a service

- Customer Support:
    - send an email from the web page
 
## Tech Used
### Some the tech used includes:
- [Django](https://www.djangoproject.com/)
    - I use **Django** to handle the backend
- [Django](http://www.django-rest-framework.org/)
    - I use **Django Rest Framework** to build APIs for my frontend
- [ReactJS](https://reactjs.org/) 
    - I use **ReactJS** (and React Router) for the frontend
- [Materialize](http://materializecss.com/)
    - I use **Materialize** for the css only (trying to avoid manipulating the real DOM directly since I'm using React)
 
## Testing
- I included unit tests in my django apps whenever necessary ie custom functions
- I am using coverage to ensure that my test coverage is sufficient

## Contributing
### Getting the code up and running
1. Firstly you will need to clone this repository by running the ```git clone https://github.com/mathilde206/weekend-planner``` command
2. Then you need to install all the dependencies from the requirements.txt file:
  ```
  pip install -r requirements.txt

  ```
3. You will need to generate a secret key for django to work
3. To start the application : ```python3 manage.py runserver```
4. Make changes to the code and if you think it belongs in here then just submit a pull request

### Contribute to the content
Feel free to register to the site and start adding recommendations.