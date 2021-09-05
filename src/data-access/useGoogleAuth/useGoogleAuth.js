import axios from "axios"
import { useState } from "react"
import { COOKIE_NAME } from "../../constants/constants"
import Cookies from "universal-cookie"

const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const cookies = new Cookies()
  const responseSuccessGoogle = async (response) => {
    setIsLoading(true)
    try {
      await axios({
        method: "POST",
        url: `${process.env.REACT_APP_NODE_BACKEND_URL}/users/auth/google`,
        data: { tokenId: response.tokenId },
      }).then((response) => {
        cookies.set(COOKIE_NAME, response.data.token)
        console.log(response)
        setIsLoading(false)
        window.location.href = "/dashboard"
      })
    } catch (e) {
      console.log(e)
      setIsLoading(false)
    }

    // window.location.href = "/dashboard"
  }
  const responseErrorGoogle = (response) => {
    console.log(response)
  }
  return { responseSuccessGoogle, responseErrorGoogle, isLoading, setIsLoading }
}

export default useGoogleAuth
