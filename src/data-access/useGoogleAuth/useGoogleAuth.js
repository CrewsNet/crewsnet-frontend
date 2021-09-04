import axios from "axios"
import { useState } from "react"

const useGoogleAuth = () => {
  const responseSuccessGoogle = async (response) => {
    console.log(response)
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_NODE_BACKEND_URL}/auth/google`,
      data: { tokenId: response.tokenId },
    }).then((response) => {
      console.log(response)
    })

    window.location.href = "/dashboard"
  }
  const responseErrorGoogle = (response) => {
    console.log(response)
  }
  return { responseSuccessGoogle, responseErrorGoogle }
}

export default useGoogleAuth
