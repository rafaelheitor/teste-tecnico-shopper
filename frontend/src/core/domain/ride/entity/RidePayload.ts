import { Driver } from "@core/domain/driver/entity/DriverPayload";

type Coordinate = {
  latitude: number;
  longitude: number;
};

export type Ride = {
  origin: Coordinate;
  destination: Coordinate;
  distance: number;
  duration: string;
  options: Driver[];
  originString: string;
  destinationString: string;
  customerId: string;
};
