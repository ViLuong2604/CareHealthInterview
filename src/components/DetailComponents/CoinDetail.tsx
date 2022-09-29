import axios from "axios";
import { useState, useEffect } from "react";

import { Line } from "react-chartjs-2";
import { CircularProgress, ThemeProvider } from "@material-ui/core";

import { chartDays } from "../../config/chartDays";
import { CryptoState } from "../../Context";
import SelectSymbolButton from "../SelectSymbolButton/SelectSymbolButton";
import { darkTheme, useCoinDetailStyles } from "./Styles";
import { CoinType, ContextType } from "../../Pages/types/CoinType";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { useQuery } from "react-query";
import { HistoricalChart } from "../../config/HttpRequest";

type prop = {
  coin: CoinType;
};

type price = string[];

export default function CoinDetail({ coin }: prop): JSX.Element {
  const [days, setDays] = useState<number>(1);
  const { currency }: ContextType = CryptoState();

  const [flag, setFlag] = useState<boolean>(false);
  const [labels, setLabels] = useState<string[]>();
  const [dataSet, setDataSet] = useState<string[]>();
  const classes: ClassNameMap<"container"> = useCoinDetailStyles();

  const { data: historicData } = useQuery(
    ["ListMerchantUser", days],
    async (): Promise<price[]> => {
      if (currency) {
        const { data } = await axios.get(
          HistoricalChart(coin.id, days, currency)
        );
        setFlag(true);
        if (data.prices) {
          return data.prices;
        }
      }

      return [];
    }
  );

  useEffect(() => {
    if (historicData) {
      const his = historicData.map((coin: string[]) => {
        let date = new Date(coin[0]);
        let time =
          date.getHours() > 12
            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
            : `${date.getHours()}:${date.getMinutes()} AM`;
        return days === 1 ? time : date.toLocaleDateString();
      });
      setLabels(his);
      const data = historicData.map((coin: string[]) => coin[1]);
      setDataSet(data);
    }
  }, [historicData, days]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData || flag === false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: labels,

                datasets: [
                  {
                    data: dataSet,
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectSymbolButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setFlag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectSymbolButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
