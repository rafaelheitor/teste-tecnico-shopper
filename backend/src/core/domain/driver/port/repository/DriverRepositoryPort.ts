import { Driver } from "../../entity/Driver";

export interface DriverRepositoryPort {
  getDriverByMinimunDistance(distance: number): Promise<Driver[]>;
  getById(id: number): Promise<Driver>;
}
