import { HttpClient } from "@core/common/protocol/http/HttpClient";
import {
  RoutesGatewayPort,
  LatLong,
} from "@core/domain/ride/port/gateway/RoutesGatewayPort";
import { config } from "@infrastructure/config/config";

export class RoutesGatewayAdapter implements RoutesGatewayPort {
  private readonly geoCodingEndpoint =
    "https://maps.googleapis.com/maps/api/geocode/json";

  private readonly computeRoutesEndpoint =
    "https://routes.googleapis.com/directions/v2:computeRoutes";

  constructor(private readonly httpClient: HttpClient) {}

  async getLatLongFromAddress(address: string): Promise<LatLong> {
    const response = await this.httpClient.request({
      url: `${this.geoCodingEndpoint}?address=${address}&key=${
        config().ApiServerConfig.GOOGLE_API_KEY
      }`,
      method: "get",
    });

    const results = response.body.results;

    if (results.length === 0) {
      throw new Error(`No coordinates found for address: ${address}`);
    }

    return {
      latitude: results[0].geometry.location.lat,
      longitude: results[0].geometry.location.lng,
    };
  }

  async getDistanceAndDuration(
    origin: LatLong,
    destination: LatLong
  ): Promise<{ distance: number; duration: string; routeResponse: object }> {
    const response = await this.httpClient.request({
      method: "post",
      url: `${this.computeRoutesEndpoint}`,
      body: {
        origin: {
          location: {
            latLng: {
              ...origin,
            },
          },
        },
        destination: {
          location: {
            latLng: {
              ...destination,
            },
          },
        },
        travelMode: "DRIVE",
        routeModifiers: {
          avoidTolls: false,
        },
        computeAlternativeRoutes: false,
      },
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": config().ApiServerConfig.GOOGLE_API_KEY,
        "X-Goog-FieldMask":
          "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
      },
    });

    return {
      distance: response.body.routes[0].distanceMeters,
      duration: response.body.routes[0].duration,
      routeResponse: response.body,
    };
  }
}
