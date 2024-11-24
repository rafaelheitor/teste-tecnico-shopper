import {
  RoutesGatewayPort,
  LatLong,
} from "@core/domain/ride/port/gateway/RoutesGatewayPort";

export class RoutesGatewayAdapter implements RoutesGatewayPort {
  getLatLongFromAddress(address: string): Promise<LatLong> {
    throw new Error("Method not implemented.");
  }
  getDistanceAndDuration(
    origin: LatLong,
    destination: LatLong
  ): Promise<{ distance: number; duration: string }> {
    throw new Error("Method not implemented.");
  }
}
