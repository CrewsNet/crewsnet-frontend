import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Dashboard from "./pages/Dashboard/Dashboard";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignIn from "./pages/SignIn/SignIn";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { createBrowserHistory } from "history";

export const customHistory = createBrowserHistory(); //This maintains custom history

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#181818",
    },
  },
});

const App = () => {
  return (
    <Router history={customHistory}>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" exact component={LandingPage} ></Route>
          <Route path="/signin" exact component={SignIn}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route component={PageNotFound}></Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default App;
