import React from 'react';
import Popular from './Popular';
import {Router, BrowserRouter, Route, Switch} from 'react-router-dom';
// const Router = ReactRouter.Router;
// const Route = ReactRouter.Route;
import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';
// const Switch = ReactRouter.Switch;
import Results from './Results';
// var createBrowserHistory = require('react-router-dom').createBrowserHistory;

class App extends React.Component {
    render(){
        return (
            <BrowserRouter>
                <div className='container'>
                    <Nav />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/battle' component={Battle} />
                        <Route path='/popular' component={Popular} />
                        <Route path='/battle/results' component={Results} />
                        <Route render={() => <h3>You are LOST...</h3>
                        } />
                    </Switch>
                </div>
            </BrowserRouter>
            
        )
    }
}

export default App;