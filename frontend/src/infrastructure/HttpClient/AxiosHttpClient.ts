import axios, { AxiosResponse } from "axios";
import { HttpClient, HttpRequest, HttpResponse } from "./HttpClient";
import { toast } from "react-toastify";

class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
        responseType: data.responseType,
        responseEncoding: data.responseEncoding,
      });
    } catch (error: any) {
      axiosResponse = error.response;
    }
    return {
      statusCode: axiosResponse?.status,
      body: axiosResponse?.data,
    };
  }
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message =
        error.response.data.error_description || "An error occurred";
      toast.error(`${message}`);
    } else if (error.request) {
      toast.error("No response received from the server.");
    } else {
      toast.error(`Error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default new AxiosHttpClient();
