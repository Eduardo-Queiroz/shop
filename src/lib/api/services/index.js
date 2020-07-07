import axios from "axios";
export const API_ROOT = "https://rickandmortyapi.com/api/";

export default class Service {
  constructor() {
    this.baseURL = API_ROOT;
  }

  get = async ({ url, completeUrl }, params = {}) => {
    try {
      const { data } = await axios.get(completeUrl || this.baseURL + url, {
        params,
      });
      return data;
    } catch (e) {
      throw new Error(e);
    }
  };
}
