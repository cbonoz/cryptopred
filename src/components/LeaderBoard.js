import React, {Component} from 'react';
import {MAX_LEADERBOARD_USERS} from '../config/constants';

class LeaderBoard extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            leaderData: [],
            loading: false,
            maxLeaders: MAX_LEADERBOARD_USERS
        }
    }

    componentWillMount() {
        this._getLeaders()
    }

    _getLeaders() {
        this.setState({loading: true});
        // TODO: fetch score leaders from private server.
        // load leaderData for rows of table.
        this.setState({loading: false}); // set loading to false once data is retrieved
        return [];
    }

    render() {
        return (
            <div className="home-content">
                <div className="center">
                    <h3 className="center">Leaderboard goes here</h3>
                    {/*TODO: implement leaderboard table*/}
                    {/*<Loading><Table/></Loading>*/}
                </div>
            </div>);
    }
}
export default LeaderBoard;