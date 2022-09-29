import { LinearProgress, Typography } from "@material-ui/core";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import { CryptoState } from "../Context";

import { useContDetailStyles } from "./styles/CoinDetailStyle";
import { numberWithCommas } from "../components/HomeComponents/CoinsDataTable";
import CoinDetail from "../components/DetailComponents/CoinDetail";
import { useQuery } from "react-query";
import { SingleCoin } from "../config/HttpRequest";
import { ContextType } from "./types/CoinType";

const CoinDetailPage = (): JSX.Element => {
  const { id }: { id: string } = useParams();
  const { currency, symbol }: ContextType = CryptoState();
  const classes = useContDetailStyles();

  const { data: coin } = useQuery("coinDetail", async (): Promise<any> => {
    const res = await axios.get(SingleCoin(id));
    return res?.data;
  });

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image?.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {currency && (
                <>
                  {symbol}{" "}
                  {numberWithCommas(
                    coin?.market_data.current_price[currency.toLowerCase()]
                  )}
                </>
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {currency && (
                <>
                  {symbol}{" "}
                  {numberWithCommas(
                    coin?.market_data.market_cap[currency.toLowerCase()]
                      .toString()
                      .slice(0, -6)
                  )}
                  M
                </>
              )}
            </Typography>
          </span>
        </div>
      </div>
      <CoinDetail coin={coin} />
    </div>
  );
};

export default CoinDetailPage;
