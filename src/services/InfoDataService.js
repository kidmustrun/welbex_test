import http from "../http-common";

class InfoDataService {
  getAll() {
    return http.get("/info");
  }
}

export default new InfoDataService();