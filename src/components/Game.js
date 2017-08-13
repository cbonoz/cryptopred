import React, {Component} from 'react';
import {allCoins} from './../helpers/Coins';
import {getRandom} from './../helpers/helper';
import GuessChart from "./GuessChart";
import Loading from 'react-loading-animation';
import api from './../config/api';
import {TimeSeries} from "pondjs";
import {CORRECT_POINTS, NUM_OPTIONS} from './../config/constants';


export default class Game extends Component {

    constructor(props, context) {
        super(props, context);

        let series = new TimeSeries({
            name: "axis1",
            columns: ["time", "value"],
            points: [
                [1400425947000, 5.2],
                [1400425948000, 1.8],
                [1400425949000, 2.6],
                [1400425950000, 9.3],
            ],
            score: 0,
            user: null
        });
        const coin = getRandom(allCoins);
        this.state = {loading: false, currentCoin: coin, coinSeries: series};
    }

    componentWillMount() {
        console.log('coin:' + JSON.stringify(this.state.currentCoin));
        this._loadNextChart();
    }

    _fetchCoinHistory(duration, coin) {
        const self = this;

        self.setState({loading: true});
        const requestUrl = api.getCoinHistory(duration, coin.symbol);
        // console.log('requesting coin history: ' + requestUrl);

        fetch(requestUrl)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                if (data === null || data['price'] === undefined || data['price'].length <= 5) {
                    self.setState({noDataMessage: "No Data Available"});
                    return;
                }

                const priceData = data['price'];
                // console.log('first price data timestamp, price', priceData[0][0], priceData[0][1]);

                let series = new TimeSeries({
                    name: "axis1",
                    columns: ["time", "value"],
                    points: priceData,
                });

                const guessOptions = self._getGuessOptions(coin.name);

                self.setState({
                    loading: false, currentDuration: duration, series: series,
                    noDataMessage: null, showChartDetails: true
                });
            })
    }

    _getRandomDuration() {
        return getRandom(["30day", "1day", "90day", "180day"]);
    }

    _getGuessOptions(coin) {
        const options = new Set(coin);
        while (options.size < NUM_OPTIONS) {
            options.add(getRandom(allCoins))
        }

        return options;
    }

    _loadNextChart() {
        this._fetchCoinHistory(this._getRandomDuration(), this.state.currentCoin)
    }

    selectRandomCoin() {
        const coin = getRandom(allCoins);
        this.setState({currentCoin: coin})
    }

    _updateScore(amount) {
        this.setState({score: this.state.score + amount});
    }

    _endGame() {
        const user = this.state.user;
        const score = this.state.score;
        this._postGameResultToServer(user, score);
    }

    _postGameResultToServer(user, score) {
        console.log("sending score", score, "for user", user);
        // TODO: send score to private server for recording onto the leaderboard (if appropriate).

    }

    // TODO: implement callback to accordingly game state (such as score), or end the game.
    guessChartCallback(result) {
        if (result === true) { // if the user was correct in their guess...
            this._updateScore(CORRECT_POINTS)
            this._loadNextChart();
        } else {
            this._endGame();
        }

    }

    render() {
        return (
            <div className="home-content">
                <div className="center">

                    <Loading isLoading={this.state.loading}>
                        <GuessChart coin={this.state.currentCoin}
                                    coinSeries={this.state.coinSeries}
                                    callback={this.guessChartCallback.bind(this)}
                                    showChartDetails={this.state.showChartDetails}/>
                    </Loading>

                </div>
            </div>);
    }
};