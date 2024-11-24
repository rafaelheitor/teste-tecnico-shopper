import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from "@core/common/protocol/http/HttpClient";
import { TxtHelper } from "@core/common/util/TxtHelper/TxtHelper";
import { Logger } from "@nestjs/common";
import axios, { AxiosResponse } from "axios";

export class AxiosHttpClient implements HttpClient {
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
    } catch (error) {
      axiosResponse = error.response;
    }
    return {
      statusCode: axiosResponse?.status,
      body: axiosResponse?.data,
      timeSpent: requestDuration,
    };
  }
}

let requestDuration;

axios.interceptors.request.use((x) => {
  x.headers["request-startTime"] = new Date().getTime();

  const date = new Date();
  const message: string =
    `Date: ${date.toISOString().split("T")[0]} ` +
    `Method: ${x.method}; ` +
    `Path: ${x.url} ` +
    `Data: ${JSON.stringify(x.data)}\n`;
  Logger.log(message, AxiosHttpClient.name);
  Promise.resolve(TxtHelper.writeLogMessageOnFile(message));

  return x;
});

axios.interceptors.response.use((response) => {
  const currentTime = new Date().getTime();
  const startTime = response.config.headers["request-startTime"];
  response.headers["request-duration"] = currentTime - startTime;

  requestDuration = response.headers["request-duration"];
  Logger.log(`Request took ${requestDuration}ms`);
  return response;
});
