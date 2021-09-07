import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { createTheme, ThemeProvider } from "@material-ui/core/styles"
import Dashboard from "./pages/Dashboard/Dashboard"
import LandingPage from "./pages/LandingPage/LandingPage"
import SignIn from "./pages/SignIn/SignIn"
import PageNotFound from "./pages/PageNotFound/PageNotFound"
import { createBrowserHistory } from "history"
import SignUp from "./pages/SignUp/SignUp"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import AuthProvider from "./context/AuthContext"

export const customHistory = createBrowserHistory() //This maintains custom history

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#181818",
    },
  },
})

const App = () => {
  return (
    <BrowserRouter history={customHistory}>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" exact component={LandingPage}></Route>
          <Route path="/signin" exact component={SignIn}></Route>
          <Route path="/signup" exact component={SignUp}></Route>
          <AuthProvider>
            <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
          </AuthProvider>
          <Route component={PageNotFound}></Route>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
