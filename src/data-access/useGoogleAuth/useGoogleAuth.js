import { useState } from "react"

const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [message, setMessage] = useState(false)

  const onGoogleAuthSubmit = async () => {
    setIsLoading(true)
    setMessage(" ")
    try {
      const response = await fetch(`${process.env.REACT_APP_NODE_BACKEND_URL}/auth/google`, {
        method: "get",
      })

      console.log("response", response.status)
      setIsLoading(false)

      if (response.status === 200) {
        console.log("success")
        window.location.href = response.url
        setMessage("Logged In")
      }
    } catch (err) {
      setMessage(err.message)
    }
  }
  return { isLoading, message, setMessage, onGoogleAuthSubmit }
}

export default useGoogleAuth
