import React, { createContext, useState, useEffect } from "react"
// import useUser from '../data-access/useUser/useUser'
import { COOKIE_NAME } from "../constants/constants"
import Cookies from "universal-cookie"

export const AuthContext = createContext()

export default function AuthProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const cookies = new Cookies()
  // const { user, getUser } = useUser();

  const checkAuthenticated = async () => {
    setIsLoading(false)
    const cookie = cookies.get(COOKIE_NAME)
    if (cookie) {
      setIsAuthenticated(true)
    }
    setIsLoading(true)
  }

  const logout = () => {
    cookies.remove(COOKIE_NAME)

    window.location.href = "/signin"
  }

  useEffect(() => {
    checkAuthenticated()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return isLoading ? (
    <AuthContext.Provider
      value={{
        user: {},
        isAuthenticated,
        checkAuthenticated,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  ) : (
    <>Preloader</>
  )
}
