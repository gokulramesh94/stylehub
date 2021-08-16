import appAxios from "../utils/axios";
import { Strings } from "../constants";

export default class userService {
  static login = async (username, password) => {
    try {
      let result = await appAxios.post(Strings.API_ENDPOINTS.LOGIN, {
        user: { username, password },
      });
      return result.data;
    } catch (error) {
      alert("Oops! Something went wrong!");
      console.log("Error - userService -> login : ", error);
    }
  };

  static register = async (data) => {
    try {
      let result = await appAxios.post(Strings.API_ENDPOINTS.REGISTER, {
        user: data,
      });
      return result.data;
    } catch (error) {
      alert("Oops! Something went wrong!");
      console.log("Error - userService -> register : ", error);
    }
  };

  static fetchUserInfo = async (username, token) => {
    try {
      let result = await appAxios.post(
        Strings.API_ENDPOINTS.FETCH_USER_INFO,
        {
          username: username,
        },
        { headers: { "x-access-token": token } }
      );
      return result.data;
    } catch (error) {
      alert("Oops! Something went wrong!");
      console.log("Error - userService -> fetchUserInfo : ", error);
    }
  };
}
