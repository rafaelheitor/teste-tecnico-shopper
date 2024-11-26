import { API_URL } from "@core/common/constants/Constants";
import AxiosHttpClient from "../HttpClient/AxiosHttpClient";
import { HttpClient } from "../../core/common/protocol/HttpClient";

class DriverUsecases {
  private readonly httpClient: HttpClient = AxiosHttpClient;

  async getDriverList() {
    const response = await this.httpClient.request({
      url: `${API_URL}/driver`,
      method: "get",
    });

    return response.body.data;
  }
}

const driverUsecases = new DriverUsecases();

export default driverUsecases;
