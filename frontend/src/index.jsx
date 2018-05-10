import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import TopNavigation from "./Components/TopNavigation/TopNavigation.jsx";
import Footer from './Components/Footer/Footer.jsx';
import Home from './Components/Home/Home.jsx';
import Blogs from "./Components/Blogs/Blogs.jsx";

import './scss/index.scss';
import './scss/_variables.scss'

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className='container-fluid'>
                    <header>
                        <TopNavigation/>
                    </header>

                    <main>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/blogs' component={Blogs}/>
                            <Route render={() => <p>Not Found</p>}/>
                        </Switch>
                    </main>

                    <Footer/>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('weekend-planner-app'));