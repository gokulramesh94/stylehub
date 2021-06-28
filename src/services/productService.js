import axios from "../utils/axios";
import { Strings } from "../constants";

export default class productService {
  static getProductByCategory = async (category) => {
    try {
      category = category ? category : "men";
      const response = await axios.get(
        Strings.API_ENDPOINTS[category.toUpperCase()],
        {}
      );
      return response.data;
    } catch (error) {
      console.log("Error - productService -> getProductByCategory : ", error);
    }
  };

}
