import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch
} from 'react-router-dom';

import CreateUpdateRecommendation from '../Components/CreateUpdateRecommendation/CreateUpdateRecommendation.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import Home from '../Components/Home/Home.jsx';
import RecommendationDetails from '../Components/RecommendationDetails/RecommendationDetails.jsx';
import TopNavigation from "../Components/TopNavigation/TopNavigation.jsx";
import UpdateRecommendation from '../Components/UpdateRecommendation/UpdateRecommendation.jsx';

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
                            <Route path='/details/:slug' component={RecommendationDetails}/>
                            <Route path='/create/' render={(props) => (
                                <CreateUpdateRecommendation
                                    {...props}
                                    action={"create"}
                                    apiURL={"/api/recommendations/create/"}
                                />)}
                            />
                            <Route path='/edit/:slug' component={UpdateRecommendation}/>
                            <Route render={() => <div className="container" style={{minHeight: '70vh'}}><h1>Not Found</h1></div>}/>
                        </Switch>
                    </main>

                    <Footer/>
                </div>
            </Router>
        )
    }
}

export default App;