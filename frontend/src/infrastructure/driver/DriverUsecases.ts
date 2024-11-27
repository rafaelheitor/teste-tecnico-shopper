import { API_URL } from "@core/common/constants/Constants";
import AxiosHttpClient from "../HttpClient/AxiosHttpClient";
import { HttpClient } from "../../core/common/protocol/HttpClient";
import { Driver } from "@core/domain/driver/entity/DriverPayload";

class DriverUsecases {
  private readonly httpClient: HttpClient = AxiosHttpClient;

  async getDriverList(): Promise<Driver[]> {
    const response = await this.httpClient.request({
      url: `${API_URL}/driver`,
      method: "get",
    });

    return response.body.data;
  }
}

const driverUsecases = new DriverUsecases();

export default driverUsecases;
