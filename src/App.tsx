import { makeStyles } from "@material-ui/core";

import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import HeaderComponent from "./components/HeaderComponent";
import Homepage from "./Pages/Home";
import CoinDetailPage from "./Pages/CoinDetail";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App(): JSX.Element {
  const classes = useStyles();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className={classes.App}>
          <HeaderComponent />
          <Route path="/" component={Homepage} exact />
          <Route path="/coins/:id" component={CoinDetailPage} exact />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
