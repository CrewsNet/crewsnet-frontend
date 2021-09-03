import { useState } from "react"

const useContest = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [contests, setContests] = useState([])
  const [message, setMessage] = useState("")

  const getContest = async () => {
    setIsLoading(true)
    setMessage(" ")
    try {
      console.log(process.env.REACT_APP_NODE_BACKEND_URL)
      const response = await fetch(`${process.env.REACT_APP_NODE_BACKEND_URL}/user/contests`, {
        method: "get",
      })
      const body = await response.json()
      console.log(body)
      setIsLoading(false)
      if (response.status === 200) {
        setContests(body.data)
        setMessage("Success")
      }
    } catch (err) {
      setMessage(err.message)
    }
  }
  return { isLoading, message, setMessage, getContest, contests }
}

export default useContest
