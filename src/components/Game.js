import React, {Component} from 'react';
import logo from '../static/crypto_block_trans_cropped.png';
import {Link} from 'react-router-dom';
import { coins } from './../helpers/Coins';
import { getRandom } from './../helpers/helper';
import CoinChart from "./CoinChart";


export default class Game extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {loading: false, currentCoin: null};
    }

    componentWillMount() {

    }

    selectRandomCoin() {
        const coin = getRandom(coins);
        this.setState({currentCoin: coin})
    }


    render() {
        return (
            <div className="home-content">
                <div className="center">

                    <CoinChart coin={this.state.coin}/>

                </div>
            </div>);
    }
};