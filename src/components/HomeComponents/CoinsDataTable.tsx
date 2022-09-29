import { useState } from "react";

import Pagination from "@material-ui/lab/Pagination";
import {
  Container,
  ThemeProvider,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";

import { CryptoState } from "../../Context";
import { darkTheme, useStyles } from "./Styles";
import TableContainerComponents from "./TableContainerComponents";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { CoinType, ContextType } from "../../Pages/types/CoinType";

import { useQuery } from "react-query";
import { CoinList } from "../../config/HttpRequest";

export function numberWithCommas(x: string | undefined): string {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return "";
}

export default function CoinsDataTable(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [soft, setSoft] = useState<string>("CHANGE");
  const [page, setPage] = useState<number>(1);
  const { currency }: ContextType = CryptoState();
  const classes: ClassNameMap<"row" | "pagination"> = useStyles();

  const { data: coins, isLoading: loading } = useQuery(
    ["ListMerchantUser", currency],
    async (): Promise<CoinType[]> => {
      if (currency) {
        const res = await axios.get(CoinList(currency));
        return res?.data;
      }
      return [];
    }
  );

  const handleSearch = (): CoinType[] => {
    if (coins instanceof Array) {
      const coinFilter = coins.filter(
        (coin: CoinType) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      );

      switch (soft) {
        case "PRICE":
          return coinFilter.sort((a, b) =>
            a.current_price === b.current_price
              ? 0
              : a.current_price > b.current_price
              ? 1
              : -1
          );

        case "MARKET":
          return coinFilter.sort((a, b) =>
            a.market_cap === b.market_cap
              ? 0
              : a.market_cap > b.market_cap
              ? 1
              : -1
          );

        default:
          return coinFilter.sort((a, b) =>
            a.price_change_percentage_24h === b.price_change_percentage_24h
              ? 0
              : a.price_change_percentage_24h > b.price_change_percentage_24h
              ? 1
              : -1
          );
      }
    }
    return [];
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <div>
          <TextField
            label="Search For a Crypto Currency.."
            variant="outlined"
            style={{ marginBottom: 20, width: "80%" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            variant="outlined"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue="PRICE"
            value={soft}
            style={{ width: "18%", marginLeft: 15 }}
            onChange={(e: any) => setSoft(e.target.value)}
          >
            <MenuItem value={"PRICE"}>Price</MenuItem>
            <MenuItem value={"MARKET"}>Market Cap</MenuItem>
            <MenuItem value={"CHANGE"}>Change</MenuItem>
          </Select>
        </div>

        <TableContainerComponents
          handleSearch={handleSearch}
          numberWithCommas={numberWithCommas}
          classes={classes}
          page={page}
          loading={loading}
        />

        <Pagination
          count={+(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}
