import { API_URL } from "@core/common/constants/Constants";
import AxiosHttpClient from "../HttpClient/AxiosHttpClient";
import { HttpClient } from "@core/common/protocol/HttpClient";

class RideUsecases {
  private readonly httpClient: HttpClient = AxiosHttpClient;

  async estimateRideUsecase(options: EstimateRideOptions) {
    const response = await this.httpClient.request({
      url: `${API_URL}/ride/estimate`,
      body: {
        customer_id: options.customer_id,
        origin: options.origin,
        destination: options.destination,
      },
      method: "post",
    });

    return response.body;
  }

  async saveRideUsecase(options: SaveRideOptions) {
    const response = await this.httpClient.request({
      url: `${API_URL}/ride/confirm`,
      body: {
        ...options,
      },
      method: "patch",
    });

    return response.body;
  }

  async getRideHistoryUsecase(options: GetRideHistoryOptions) {
    const baseURL = `${API_URL}/ride/${options.customer_id}`;

    const url = options.driver_id
      ? baseURL + `?driver_id=${options.driver_id}`
      : baseURL;

    console.log(url);

    const response = await this.httpClient.request({
      url,
      body: {
        ...options,
      },
      method: "get",
    });

    return response.body;
  }
}

type EstimateRideOptions = {
  customer_id: string;
  origin: string;
  destination: string;
};

type SaveRideOptions = {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
};

type GetRideHistoryOptions = {
  customer_id: string;
  driver_id?: number;
};
const rideUsecases = new RideUsecases();

export default rideUsecases;
