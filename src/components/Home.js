import React, {Component} from 'react';
import logo from '../static/crypto_block_trans_cropped.png';
import {Link} from 'react-router-dom';
import { allCoins } from './../helpers/Coins';
import { getRandom } from './../helpers/helper';
import { LeaderBoard } from './LeaderBoard';


export default class Home extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {loading: false, currentCoin: null};
    }

    componentWillMount() {

    }

    selectRandomCoin() {
        const coin = getRandom(allCoins);
        this.setState({currentCoin: coin})
    }


    render() {
        return (
            <div className="home-content">
                <div className="center">
                    <img src={logo} alt="CryptoAlarms logo" className="clear banner-image"/>
                    <span className="header-font clear">
                        Cryptocurrency price prediction game.
                    </span>

                    <LeaderBoard/>

                    <Link role="button" to="/login" className="login-button btn-warning">Start Game</Link>

                </div>
            </div>);
    }
};