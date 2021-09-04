import { useState } from "react"
import Axios from "axios"

const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [message, setMessage] = useState(false)

  const onSignUp = async ({ name, password, email }) => {
    setIsLoading(true)
    setMessage(" ")
    try {
      console.log(name, email, password)
      const response = await Axios.post(`${process.env.REACT_APP_NODE_BACKEND_URL}/users/signup`, { name, email, password })
      console.log(response)
      const body = await response.data
      setIsLoading(false)
      console.log(body)
      if (response.status == 200) {
        setMessage(body.msg)
      }
    } catch (err) {
      setMessage(err.message)
    }
  }
  return { isLoading, message, setMessage, onSignUp }
}

export default useSignUp
