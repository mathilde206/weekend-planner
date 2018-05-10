import React from 'react';
import {NavLink} from "react-router-dom";

import './TopNavigation.scss';

class TopNavigation extends React.Component {


    render() {
        return (
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                        <NavLink exact className="brand-logo" to="/">The Planner</NavLink>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><NavLink activeClassName="active" to="/blogs">Explore</NavLink></li>
                            <li><NavLink activeClassName="active" to="/register">Register</NavLink></li>
                            <li><NavLink activeClassName="active" to="/login">Login</NavLink></li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default TopNavigation;
