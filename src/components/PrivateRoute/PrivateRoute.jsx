import React, { useContext } from "react"
import { Route } from "react-router"
import { AuthContext } from "../../context/AuthContext"

export default function PrivateRoute({ component: RouteComponent, ...rest }) {
  const { user, isAuthenticated } = useContext(AuthContext)

  const access_token = localStorage.getItem("access-token")

  return (
    <>
      <Route {...rest} render={(routeProps) => (access_token === undefined || access_token === "" || access_token === null || !isAuthenticated ? <>{(window.location.href = "/login")}</> : <RouteComponent {...routeProps} user={user} />)} />
    </>
  )
}
