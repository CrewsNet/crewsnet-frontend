import React, { useState, useEffect } from "react"
import "./Dashboard.scss"
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom"
import DrawerLeft from "./components/DrawerLeft/DrawerLeft"
import DrawerRight from "./components/DrawerRight/DrawerRight"
import Feed from "./components/Feed/Feed"
import Projects from "./components/Projects/Project"
import Profile from "./components/Profile/Profile"
import Contest from "./components/Contest/Contest"
import SavedContest from "./components/SavedContest/SavedContest"
import Messages from "./components/Messages/Messages"
import PageNotFound from "../PageNotFound/PageNotFound"
import Header from "./components/Header/Header"
import { makeStyles } from "@material-ui/core/styles"
import { ACCESS_TOKEN } from "../../constants/constants"
import Axios from "axios"

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
})

const Dashboard = (props) => {
  const classes = useStyles()

  const path = "/(|projects|profile|contest|savedcontest|messages)/"
  const [showDrawerLeft, setShowDrawerLeft] = useState(false)

  // useEffect(async () => {
  //   const token = localStorage.getItem(ACCESS_TOKEN)
  //   console.log("dashboard", token)
  //   const response = await Axios({
  //     method: "get",
  //     url: `${process.env.REACT_APP_NODE_BACKEND_URL}/users/dash`,
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //   console.log(response)
  // }, [])

  return (
    <div className={classes.container}>
      <BrowserRouter basename="dashboard">
        <Route exact path={path}>
          <DrawerLeft showDrawerLeft={showDrawerLeft} setShowDrawerLeft={setShowDrawerLeft} />
        </Route>
        <Route exact path={path}>
          <Header showDrawerLeft={showDrawerLeft} setShowDrawerLeft={setShowDrawerLeft} />
        </Route>
        <Switch>
          <Route exact path="/" component={Feed} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/contest" component={Contest} />
          <Route exact path="/savedcontest" component={SavedContest} />
          <Route exact path="/messages" component={Messages} />
          <Route component={PageNotFound} />
        </Switch>
        <Route exact path={path} component={DrawerRight} props={props} />
      </BrowserRouter>
    </div>
  )
}

export default withRouter(Dashboard)
