import { useState } from "react"
import Axios from "axios"
import { ACCESS_TOKEN } from "../../constants/constants"

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(false)

  const onLogin = async ({ email, password }) => {
    setIsLoading(true)
    setMessage(" ")
    try {
      console.log(email, password)
      const response = await Axios.post(`${process.env.REACT_APP_NODE_BACKEND_URL}/users/login`, { email, password })
      console.log(response.data.token)
      if (response.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, response.data.token)
        setMessage("Successful")
        window.location.href = "/dashboard"
      } else {
        setMessage("fail")
      }
      setIsLoading(false)
    } catch (err) {
      setMessage(err.message)
      setIsLoading(false)
    }
  }
  return { isLoading, message, setMessage, onLogin }
}

export default useLogin
