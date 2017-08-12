/**
 * Created by cbuonocore on 7/12/17.
 */
import React, {Component} from 'react';
import {Charts, ChartContainer, ChartRow, YAxis, LineChart} from "react-timeseries-charts";
import {TimeSeries} from "pondjs";
import {Button} from 'react-bootstrap';

class GuessChart extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            coinSeries: this.props.coinSeries,
            coin: this.props.coin,
            tracker: null,
            chartWidth: Math.min(900, window.innerWidth - 100),
            showChartDetails: false,
            guessOptions: []
        };
    }

    handleTrackerChanged(t) {
        // t is the tracker (usually date time UTC)
        if (t !== null) {
            this.setState({tracker: t});
        }
    }

    _checkAnswer(coin) {
        if (coin.name === this.state.coin.name) {
            // correct answer
            this.props.callback(true);
        } else {
            this.props.callback(false);
        }
    }

    render() {

        let series = this.state.coinSeries;

        const dateStyle = {
            fontSize: 16,
            color: "#AAA",
            borderWidth: 1,
            borderColor: "#F4F4F4"
        };

        const tracker = this.state.tracker;

        return (
            <div className="center">
                {this.state.showChartDetails && <b>{this.state.coin.name}</b>}
                <ChartContainer timeRange={series.timerange()}
                                trackerPosition={this.state.tracker}
                                onTrackerChanged={this.handleTrackerChanged.bind(this)}
                                className="chart-container"
                                width={this.state.chartWidth}>
                    <ChartRow height="300">
                        <YAxis label="Price (USD)" id="resptime" min={series.min()} max={series.max()}
                               format=",.0f"/>
                        <Charts>
                            <LineChart axis="resptime" series={series}/>
                        </Charts>
                    </ChartRow>
                </ChartContainer>
                {(this.state.showChartDetails && tracker) && <div className="center">
                    <p style={dateStyle}>{JSON.stringify(tracker)}</p>
                    <b>{this.props.coin.name} Unit Price ($):<br/>
                        ${JSON.parse(this.state.series.atTime(tracker))['data']['value']}</b>
                </div>}

                <div className="guessOptionButtons">
                    {this.state.guessOptions.map((coin) => {
                        return <Button onClick={() => {
                            this._checkAnswer(coin)
                        }} className="center coin-row-button">{coin}</Button>
                    })
                    }
                </div>

            </div>

        )
    }
}

GuessChart.propTypes = {};
GuessChart.defaultProps = {};

export default GuessChart;

