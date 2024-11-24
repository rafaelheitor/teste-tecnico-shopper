import { InfrastructureModule } from "@application/di/InfrastructureModule";
import { InfrastructureDITokens } from "@core/common/di/InfrastructureDITokens";
import { HttpClient } from "@core/common/protocol/http/HttpClient";
import { RideDITokens } from "@core/domain/ride/di/RideDITokens";
import {
  LatLong,
  RoutesGatewayPort,
} from "@core/domain/ride/port/gateway/RoutesGatewayPort";
import { AxiosHttpClient } from "@infrastructure/adapter/HttpClient/AxiosHttpClient";
import { RoutesGatewayAdapter } from "@infrastructure/adapter/ride/RideGatewayAdapter";
import { Test, TestingModule } from "@nestjs/testing";

describe("RoutesGatewayAdapter", () => {
  let routesGateway: RoutesGatewayPort;
  let httpClient: HttpClient;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RideDITokens.RoutesGatewayPort,
          useFactory: (httpClient) => new RoutesGatewayAdapter(httpClient),
          inject: [InfrastructureDITokens.HttpClient],
        },
        {
          provide: InfrastructureDITokens.HttpClient,
          useClass: AxiosHttpClient,
        },
      ],
      imports: [InfrastructureModule],
    }).compile();

    routesGateway = module.get<RoutesGatewayPort>(
      RideDITokens.RoutesGatewayPort
    );

    httpClient = module.get<HttpClient>(InfrastructureDITokens.HttpClient);
  });
  test("getLatLongFromAddress method", async () => {
    const result: LatLong = await routesGateway.getLatLongFromAddress(
      "Rua Elvira Dorea, centro, Alagoinhas"
    );

    const response = {
      statusCode: 200,
      body: {
        results: [
          {
            geometry: {
              location: { lat: -12.1381952, lng: -38.4181099 },
            },
          },
        ],
      },
      timeSpent: 290,
    };

    jest.spyOn(httpClient, "request").mockResolvedValue(response);

    expect(result).toBeDefined();
    expect(result).toEqual({
      latitude: response.body.results[0].geometry.location.lat,
      longitude: response.body.results[0].geometry.location.lng,
    });
  });

  test("getDistanceAndDuration", async () => {
    const response = {
      timeSpent: 290,
      statusCode: 200,
      body: {
        routes: [
          {
            distanceMeters: 2125,
            duration: "395s",
            polyline: {
              encodedPolyline:
                "vs_iAl~miFp@{@vAwAvFmGTL\\b@\\TTVlLfJhCrB~ArAvA`AxI~GPZTXNVPfANdBEjAw@|FxGdAvARt@aGjBmM",
            },
          },
        ],
      },
    };

    jest.spyOn(httpClient, "request").mockResolvedValue(response);

    const result = await routesGateway.getDistanceAndDuration(
      { latitude: -12.1274599, longitude: -38.415252 },
      { latitude: -12.1381339, longitude: -38.4179707 }
    );

    expect(result).toBeDefined();
    expect(result).toEqual({
      distance: response.body.routes[0].distanceMeters,
      duration: response.body.routes[0].duration,
      routeResponse: response.body,
    });
  });
});
