import React from "react";

import About from '../About/About.jsx'
import HomeExplore from '../HomeExplore/HomeExplore.jsx'

import './Home.scss'

const Home = ({match}) => (
    <div>
        <div className="home">
            <h1>Where do you go next weekend ?</h1>
            <a href="#explore">
                <button className="btn-default waves-effect waves-light btn-large">Explore</button>
            </a>
        </div>
        <div id="explore" className="container">
            <HomeExplore />
        </div>
        <About/>
    </div>
);

export default Home;

//TODO: come back to home when clicking on brand logo