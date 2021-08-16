import axios from "../utils/axios";
import { Strings } from "../constants";

export default class productService {
  static getProductByCategory = async (category) => {
    try {
      category = category ? category : "men";
      const response = await axios.get(
        Strings.API_ENDPOINTS.FETCH_PRODUCTS_BY_CATEGORY,
        {
          params: {
            category,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error - productService -> getProductByCategory : ", error);
    }
  };

  static getProductById = async (id) => {
    try {
      id = id ? id : "";
      const response = await axios.get(
        Strings.API_ENDPOINTS.FETCH_PRODUCT_BY_ID,
        {
          params: {
            id,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error - productService -> getProductById : ", error);
    }
  };
}
