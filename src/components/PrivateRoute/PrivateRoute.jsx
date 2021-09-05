import React, { useContext } from "react"
import { Route } from "react-router"
import { AuthContext } from "../../context/AuthContext"
import { COOKIE_NAME } from "../../constants/constants"
import Cookies from "universal-cookie"

export default function PrivateRoute({ component: RouteComponent, ...rest }) {
  const cookies = new Cookies()
  const { user, isAuthenticated } = useContext(AuthContext)
  const cookie = cookies.get(COOKIE_NAME)
  return (
    <>
      <Route {...rest} render={(routeProps) => (cookie === undefined || cookie === "" || cookie === null || !isAuthenticated ? (window.location.href = "/signin") : <RouteComponent {...routeProps} user={user} />)} />
    </>
  )
}
