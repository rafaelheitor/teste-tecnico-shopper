import { Ride } from "../../entity/Ride";

export interface RideRepositoryPort {
  save(ride: Ride): Promise<Ride>;
  getSavedRides(options: GetRideOptions): Promise<Ride[]>;
}

export type GetRideOptions = {
  customer_id: string;
  driver_id?: number;
};
