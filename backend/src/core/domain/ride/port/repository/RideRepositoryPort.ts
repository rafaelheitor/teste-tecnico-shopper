import { Ride } from "../../entity/Ride";

export interface RideRepositoryPort {
  save(ride: Ride): Promise<Ride>;
}
