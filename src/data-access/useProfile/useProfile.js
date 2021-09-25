import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { COOKIE_NAME } from "../../constants/constants";

const useProfile = () => {
  const [isLoading, setIsLoading] = useState();
  const [profile, setProfile] = useState();
  const [message, setMessage] = useState("");
  const cookies = new Cookies();

  const getProfile = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      const response = await axios.get(`${process.env.REACT_APP_NODE_BACKEND_URL}/user/profile`);
      console.log(response);
      setProfile(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setMessage(error.message);
    }
  };

  const saveProfile = async (profileData) => {
    setIsLoading(true);
    setMessage("");
    const cookie = cookies.get(COOKIE_NAME);
    try {
      const response = await axios({
        method: "",
        url: ``,
        headers: { Authorization: `Bearer ${cookie}` },
        data: profileData,
      });
      setIsLoading(false);
      if (response.data.status) {
        setMessage("Succesfully Updated");
      }
    } catch (error) {
      setIsLoading(false);
      setMessage(error.message);
    }
  };

  return { profile, setProfile, getProfile, saveProfile };
};

export default useProfile;
