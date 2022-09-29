const { REACT_APP_API_ENDPOINT } = process.env;

const CoinList = (currency: string) =>
  `${REACT_APP_API_ENDPOINT}/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

const SingleCoin = (id: string) => `${REACT_APP_API_ENDPOINT}/${id}`;

const HistoricalChart = (id: string, days = 365, currency: string) =>
  `${REACT_APP_API_ENDPOINT}/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export { CoinList, SingleCoin, HistoricalChart };
