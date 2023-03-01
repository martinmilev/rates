import axios from "axios";

const apiUrls = {
  assetPairs: "https://api.kraken.com/0/public/AssetPairs",
  ticker: "https://api.kraken.com/0/public/Ticker",
};

export const getAssetPairs = () =>
  axios(apiUrls.assetPairs).then((response) => response.data.result);

export const getTicker = (params = "") =>
  axios(`${apiUrls.ticker}?${params}`).then((response) => response.data.result);
