import { useState } from "react";
import { COOKIE_NAME } from "../../constants/constants";
import Cookies from "universal-cookie";
import axios from "axios";

const useContest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [contests, setContests] = useState([]);
  const [savedContests, setSavedContests] = useState([]);
  const [message, setMessage] = useState("");
  const cookies = new Cookies();

  const getContest = async () => {
    setIsLoading(true);
    setMessage(" ");
    try {
      console.log(process.env.REACT_APP_NODE_BACKEND_URL);
      const response = await fetch(`${process.env.REACT_APP_NODE_BACKEND_URL}/user/contest`, {
        method: "get",
      });
      const body = await response.json();
      // console.log(body)
      setIsLoading(false);
      if (response.status === 200) {
        setContests(body.data);
        setMessage("Success");
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  const saveContest = async (contestData) => {
    setIsUpdating(true);
    setMessage(" ");
    const cookie = cookies.get(COOKIE_NAME);
    try {
      console.log(process.env.REACT_APP_NODE_BACKEND_URL);
      const response = await axios({
        method: "patch",
        url: `${process.env.REACT_APP_NODE_BACKEND_URL}/user/contest/save`,
        headers: { Authorization: `Bearer ${cookie}` },
        data: contestData,
      });
      const body = await response.data;
      // console.log(body)
      await getContest();
      setIsUpdating(false);
      if (response.status === 200) {
        setMessage("Success");
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  const unSaveContest = async (contestData) => {
    setIsUpdating(true);
    setMessage(" ");
    const cookie = cookies.get(COOKIE_NAME);
    console.log(contestData);
    try {
      console.log(process.env.REACT_APP_NODE_BACKEND_URL);
      const response = await axios({
        method: "patch",
        url: `${process.env.REACT_APP_NODE_BACKEND_URL}/user/contest/unSave`,
        headers: { Authorization: `Bearer ${cookie}` },
        data: contestData,
      });
      console.log(response);
      const body = await response.data;
      // console.log(body)
      setIsUpdating(false);
      if (response.status === 200) {
        setMessage("Success");
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  const getSavedContest = async () => {
    setIsLoading(true);
    setMessage(" ");

    const cookie = cookies.get(COOKIE_NAME);
    try {
      console.log(process.env.REACT_APP_NODE_BACKEND_URL);
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_NODE_BACKEND_URL}/user/contest/getSave`,
        headers: { Authorization: `Bearer ${cookie}` },
      });
      const body = await response.data;

      if (response.status === 200) {
        setSavedContests(body.data);
        setMessage("Success");
        setIsLoading(false);
      }
    } catch (err) {
      setMessage(err.message);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isUpdating,
    message,
    setMessage,
    getContest,
    contests,
    savedContests,
    saveContest,
    unSaveContest,
    getSavedContest,
  };
};

export default useContest;
