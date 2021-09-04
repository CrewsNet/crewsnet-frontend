import React, { useContext } from "react"
import { Route } from "react-router"
import { AuthContext } from "../../context/AuthContext"
import { ACCESS_TOKEN } from "../../constants/constants"

export default function PrivateRoute({ component: RouteComponent, ...rest }) {
  const { user, isAuthenticated } = useContext(AuthContext)

  const access_token = localStorage.getItem(ACCESS_TOKEN)

  return (
    <>
      <Route {...rest} render={(routeProps) => (access_token === undefined || access_token === "" || access_token === null || !isAuthenticated ? <>{(window.location.href = "/signin")}</> : <RouteComponent {...routeProps} user={user} />)} />
    </>
  )
}
