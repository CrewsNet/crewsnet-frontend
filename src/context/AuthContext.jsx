import React, { createContext, useState, useEffect } from "react"
// import useUser from '../data-access/useUser/useUser'

import { ACCESS_TOKEN } from "../utils/constants"

export const AuthContext = createContext()

export default function AuthProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  // const { user, getUser } = useUser();

  const checkAuthenticated = async () => {
    setIsLoaded(false)
    const access_token = localStorage.getItem(ACCESS_TOKEN)
    if (access_token) {
      setIsAuthenticated(true)
      // getUser(access_token);
    }
    setIsLoaded(true)
  }

  const logout = () => {
    localStorage.setItem(ACCESS_TOKEN, "")
    window.location.href = "/login"
  }

  useEffect(() => {
    checkAuthenticated()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return isLoaded ? (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        checkAuthenticated,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  ) : (
    <Loader />
  )
}
