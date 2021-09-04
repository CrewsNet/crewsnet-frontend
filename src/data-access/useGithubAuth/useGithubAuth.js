import axios from "axios"
import { useState } from "react"
import { ACCESS_TOKEN } from "../../constants/constants"

const useGithubAuth = () => {
  const responseSuccessGithub = async (response) => {
    console.log("ran")
    console.log(response)
    // try {
    //   await axios({
    //     method: "POST",
    //     url: `${process.env.REACT_APP_NODE_BACKEND_URL}/users/auth/Github`,
    //     data: { tokenId: response.tokenId },
    //   }).then((response) => {
    //     localStorage.setItem(ACCESS_TOKEN, response.data.token)
    //     console.log(response)
    //     window.location.href = "/dashboard"
    //   })
    // } catch (e) {
    //   console.log(e)
    // }

    // window.location.href = "/dashboard"
  }
  const responseErrorGithub = (response) => {
    console.log(response)
  }
  return { responseSuccessGithub, responseErrorGithub }
}

export default useGithubAuth
