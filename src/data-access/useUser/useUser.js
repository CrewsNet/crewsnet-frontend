import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";
import { COOKIE_NAME } from "../../constants/constants";

const useUser = () => {
  const [user, setUser] = useState();
  const cookies = new Cookies();

  const getUser = async () => {
    const cookie = cookies.get(COOKIE_NAME);
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_NODE_BACKEND_URL}/user/getInfo`,
        headers: { Authorization: `Bearer ${cookie}` },
      });
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { user, getUser };
};

export default useUser;
