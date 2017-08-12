/**
 * Created by cbuonocore on 7/13/17.
 */
const port = 9007;
const baseUrl = `https://blackshoalgroup.com:${port}/api`;
const lionUrl = `https://api.lionshare.capital`;
const coinUrl = "https://www.coincap.io";

module.exports = {
    getScores: (email) => {
        return baseUrl + "/scores";
    },
    postScore: () => {
        return baseUrl + "/score";
    },
    getCoinHistory: (duration, coin) => {
        return coinUrl + "/history/" + duration + "/" + coin
    },
    getCoinHistoryFromLion: (period) => {
        // Period: oneOf{year, month, day}
        return lionUrl + "/api/prices?period=" + period;
    }
};

