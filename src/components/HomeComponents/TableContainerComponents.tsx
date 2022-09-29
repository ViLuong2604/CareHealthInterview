import {
  TableCell,
  LinearProgress,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../../Context";
import { CoinType } from "../../Pages/types/CoinType";

type props = {
  loading: boolean;
  handleSearch: () => CoinType[];
  page: number;
  numberWithCommas: (x: string) => string;
  classes: ClassNameMap<"row" | "pagination">;
};

type ContextType = {
  currency?: string;
  setCurrency?: () => string;
  symbol?: string;
};

export default function TableContainerComponents({
  loading,
  handleSearch,
  page,
  numberWithCommas,
  classes,
}: props): JSX.Element {
  const { symbol }: ContextType = CryptoState();

  const history = useHistory();

  return (
    <TableContainer component={Paper}>
      {loading ? (
        <LinearProgress style={{ backgroundColor: "gold" }} />
      ) : (
        <Table aria-label="simple table">
          <TableHead style={{ backgroundColor: "#EEBC1D" }}>
            <TableRow>
              {["Coin", "Price", "24h Change", "Market Cap"].map(
                (head: string) => (
                  <TableCell
                    style={{
                      color: "black",
                      fontWeight: 700,
                      fontFamily: "Montserrat",
                    }}
                    key={head}
                    align={head === "Coin" ? "left" : "right"}
                  >
                    {head}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {handleSearch()
              .slice((page - 1) * 10, (page - 1) * 10 + 10)
              .map((row: CoinType) => {
                const profit: boolean = row.price_change_percentage_24h > 0;
                return (
                  <TableRow
                    onClick={() => history.push(`/coins/${row.id}`)}
                    className={classes.row}
                    key={row.name}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        display: "flex",
                        gap: 15,
                      }}
                    >
                      <img
                        src={row?.image}
                        alt={row.name}
                        height="50"
                        style={{ marginBottom: 10 }}
                      />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span
                          style={{
                            textTransform: "uppercase",
                            fontSize: 22,
                          }}
                        >
                          {row.symbol}
                        </span>
                        <span style={{ color: "darkgrey" }}>{row.name}</span>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        color:
                          row.price_change_percentage_24h > 0
                            ? "rgb(14, 203, 129)"
                            : "red",

                        fontWeight: 500,
                      }}
                    >
                      {profit && "+"}
                      {row.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                    <TableCell align="right">
                      {symbol}
                      {numberWithCommas(row.market_cap.toString().slice(0, -6))}
                      M
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
