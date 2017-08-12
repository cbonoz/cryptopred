/**
 * Created by cbuonocore on 7/12/17.
 */
import React, {Component} from 'react';
import {Charts, ChartContainer, ChartRow, YAxis, LineChart} from "react-timeseries-charts";
import {TimeSeries} from "pondjs";
import {SegmentedControl} from './seg/index';
import Loading from 'react-loading-animation';
import api from '../../config/api';

class CoinChart extends Component {

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
            ]
        });
        this.state = {
            coinData: [],
            tracker: null,
            loading: false,
            series: series,
            noDataMessage: null,
            durationOptions: ['1day', '30day', '90day', '365day'],
            currentDuration: '30day',
            historyMap: {},
            chartWidth: Math.min(900, window.innerWidth - 100),
            showChartDetails: false
        };

    }

    componentDidMount() {
        this._updateDuration(this.state.currentDuration);
    }


    _updateDuration(duration) {
        this._fetchCoinHistory(duration, this.props.coin)
    }

    _fetchCoinHistory(duration, coin) {
        const self = this;

        self.setState({loading: true});
        const requestUrl = api.getCoinHistory(duration, coin.symbol);
        // console.log('requesting coin history: ' + requestUrl);

        const durationKey = coin.symbol + '_' + duration;
        if (self.state.historyMap.hasOwnProperty(durationKey)) {
            const existingSeries = self.state.historyMap[durationKey];
            // Check if there are any price points in the cache already for this coin and time duration selection.
            if (existingSeries._collection !== undefined && existingSeries._collection._eventList.size > 0) {
                // Set the cached state on the view.
                // console.log('using cached series', durationKey, existingSeries._collection._eventList.size, "entries");
                self.setState({
                    loading: false, currentDuration: duration, series: existingSeries, noDataMessage: null
                });
                return;
            }
        }

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

                let hist = self.state.historyMap;
                hist[durationKey] = series;

                self.setState({
                    loading: false, currentDuration: duration, series: series,
                    noDataMessage: null, historyMap: hist, showChartDetails: true
                });
            })
    }

    handleTrackerChanged(t) {
        // t is the tracker (usually date time UTC)
        if (t !== null) {
            this.setState({tracker: t});
        }
    }

    render() {

        let durationOptions = this.state.durationOptions;
        let series = this.state.series;

        const segmentOptions = [
            {label: durationOptions[0], value: durationOptions[0]},
            {label: durationOptions[1], value: durationOptions[1], default: true},
            {label: durationOptions[2], value: durationOptions[2]},
            {label: durationOptions[3], value: durationOptions[3]},
        ];

        const dateStyle = {
            fontSize: 16,
            color: "#AAA",
            borderWidth: 1,
            borderColor: "#F4F4F4"
        };

        const tracker = this.state.tracker;

        return (
            <div className="center">

                <SegmentedControl
                    name="Coin History Duration"
                    options={segmentOptions}
                    setValue={(newValue) => this._updateDuration(newValue)}
                    style={{width: 400, color: '#ab47bc'}} // purple400
                />
                <p>{this.state.currentDuration} chart</p>
                {this.state.noDataMessage === null && <Loading isLoading={this.state.loading}>
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



                    </div>

                </Loading>}
                {/*{this.state.noDataMessage !== null && <h2 className="no-data-message">{this.state.noDataMessage}</h2>}*/}

            </div>

        )
    }
}

CoinChart.propTypes = {};
CoinChart.defaultProps = {};

export default CoinChart;

