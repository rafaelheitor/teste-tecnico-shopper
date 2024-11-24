export interface RoutesGatewayPort {
  getLatLongFromAddress(address: string): Promise<LatLong>;

  getDistanceAndDuration(
    origin: LatLong,
    destination: LatLong
  ): Promise<{ distance: number; duration: string }>;
}

export type LatLong = { latitude: number; longitude: number };
