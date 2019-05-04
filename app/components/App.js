var React = require('react');
var Popular = require('./Popular');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Nav = require('./Nav');
var BrowserRouter = require('react-router-dom').BrowserRouter;
var Home = require('./Home');
var Battle = require('./Battle');
var Switch = ReactRouter.Switch;
// var createBrowserHistory = require('react-router-dom').createBrowserHistory;

class App extends React.Component {
    render(){
        return (
            <BrowserRouter>
                <div className='container'>
                    <Nav />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/battle' component={Battle} />
                        <Route path='/popular' component={Popular} />
                        <Route render={function(){
                            return <h3>You are LOST...</h3>
                        }} />
                    </Switch>
                </div>
            </BrowserRouter>
            
        )
    }
}

module.exports = App;