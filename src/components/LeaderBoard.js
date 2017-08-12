import React, {Component} from 'react';
import ReactRotatingText from 'react-rotating-text';
import logo from '../static/crypto_block_trans_cropped.png';
import {Link} from 'react-router-dom';


export default class LeaderBoard extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            leaderData: [],
            loading: false
        }
    }

    componentWillMount() {
        getLeaders()
    }

    getLeaders() {
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
                    {/*TODO: implement leaderboard table*/}
                    {/*<Loading><Table/></Loading>*/}
                </div>
            </div>);
    }
};