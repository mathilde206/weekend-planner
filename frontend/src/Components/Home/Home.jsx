import React from "react";
import { Link } from 'react-router-dom';
import './Home.scss'

const Home = ({match}) => (
    <div>
        <div className="home">
            <h1>Where do you go next weekend ?</h1>
            <Link to='/explore'>
                <button className="btn-default waves-effect waves-light btn-large">Explore</button>
            </Link>
        </div>
    </div>
);

export default Home;

//TODO: come back to home when clicking on brand logo