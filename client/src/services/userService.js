import appAxios from "../utils/axios";
import { Strings } from "../constants";

export default class userService {
  static login = async (username, password) => {
    try {
      let result = await appAxios.post(Strings.API_ENDPOINTS.LOGIN, {
        user: { username, password },
      });
      if (result && result.data && result.data.username) return true;
      else return false;
    } catch (error) {
      console.log("Error - userService -> login : ", error);
    }
  };

  static register = async (data) => {
    try {
      console.log("data : ", data);
      let result = await appAxios.post(Strings.API_ENDPOINTS.REGISTER, {
        user: data,
      });
      return result.data;
    } catch (error) {
      console.log(appAxios);
      console.log("Error - userService -> register : ", error);
    }
  };
}
