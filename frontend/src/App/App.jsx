import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch} from 'react-router-dom';

import TopNavigation from "../Components/TopNavigation/TopNavigation.jsx";
import Footer from '../Components/Footer/Footer.jsx';
import Home from '../Components/Home/Home.jsx';
import RecommendationDetails from '../Components/RecommendationDetails/RecommendationDetails.jsx'

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className='container-fluid'>
                    <header>
                        <TopNavigation/>
                    </header>

                    <main>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/details/:slug' component={RecommendationDetails}/>
                            <Route exact path='/create/' component={CreateUpdateRecommendation}/>
                            <Route render={() => <p>Not Found</p>}/>
                        </Switch>
                    </main>

                    <Footer/>
                </div>
            </Router>
        )
    }
}

export default App;