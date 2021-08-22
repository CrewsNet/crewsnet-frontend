import React from "react"
import "./Dashboard.scss"

import DrawerLeft from "./components/DrawerLeft/DrawerLeft"
import DrawerRight from "./components/DrawerRight/DrawerRight"
import { BrowserRouter, Route, Switch, withRouter, Redirect } from "react-router-dom"
import Feed from "./components/Feed/Feed"
import Projects from "./components/Projects/Project"
import Profile from "./components/Profile/Profile"
import Contest from "./components/Contest/Contest"
import SavedContest from "./components/SavedContest/SavedContest"
import Messages from "./components/Messages/Messages"
import PageNotFound from "../PageNotFound/PageNotFound"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  container: {
    // display: "flex",
  },
})

const Dashboard = (props) => {
  const classes = useStyles()

  // if (props.location.pathname == "/dashboard")
  //   return <Redirect to="/dashboard/feed" />;

  return (
    <div className={classes.container}>
      <BrowserRouter basename="dashboard">
        <Route path="/" component={DrawerLeft} />
        <Switch>
          <Route path="/" component={Feed} />
          <Route path="/projects" component={Projects} />
          <Route path="/profile" component={Profile} />
          <Route path="/contest" component={Contest} />
          <Route path="/savedcontest" component={SavedContest} />
          <Route path="/messages" component={Messages} />
          <Route component={PageNotFound} />
        </Switch>
        <Route path="/" component={DrawerRight} />
      </BrowserRouter>
    </div>
  )
}

export default withRouter(Dashboard)
