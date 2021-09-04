import axios from "axios"
import { useState } from "react"
import { ACCESS_TOKEN } from "../../constants/constants"

const useGoogleAuth = () => {
  const responseSuccessGoogle = async (response) => {
    console.log(response.tokenId)
    try {
      await axios({
        method: "POST",
        url: `${process.env.REACT_APP_NODE_BACKEND_URL}/users/auth/google`,
        data: { tokenId: response.tokenId },
      }).then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.data.token)
        console.log(response)
        // window.location.href = "/dashboard"
      })
    } catch (e) {
      console.log(e)
    }

    // window.location.href = "/dashboard"
  }
  const responseErrorGoogle = (response) => {
    console.log(response)
  }
  return { responseSuccessGoogle, responseErrorGoogle }
}

export default useGoogleAuth
