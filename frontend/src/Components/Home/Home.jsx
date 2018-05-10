import React from "react";
import {Parallax, Background} from 'react-parallax'

import './Home.scss'

const Home = (props) => (
    <div className="home">
        <h1>Where do you go next weekend ?</h1>
        <button className="btn-default waves-effect waves-light btn-large">Explore</button>
    </div>
);

export default Home;