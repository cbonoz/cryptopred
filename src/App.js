import React, {Component} from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import Game from './components/Game';

import 'react-toastify/dist/ReactToastify.min.css';

import Header from './components/Header';
import LeaderBoard from "./components/LeaderBoard";

export const APP_NAME = "Cryptopred";

export default class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true,
            authed: true,
        };

    }

    componentDidMount() {
        this.setState({loading: false});
    }

    componentWillUnmount() {
        this.removeListener()
    }

    render() {
        return this.state.loading === true ? <h1>Loading</h1> : (
            <div>
                <BrowserRouter>
                    <div className="main-content">
                        <Header authed={this.state.authed}/>
                        <div className="container">
                            <div className="row">
                                <Switch>
                                    <Route authed={this.state.authed} path='/' exact component={Home}/>
                                    <Route authed={this.state.authed} path='/game' exact component={Game}/>
                                    <Route authed={this.state.authed} path='/about' exact component={About}/>
                                    <Route authed={this.state.authed} path='/leaderboards' exact component={LeaderBoard}/>
                                    <Route render={() => <h3 className="center page-not-found">Page Not Found</h3>}/>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
