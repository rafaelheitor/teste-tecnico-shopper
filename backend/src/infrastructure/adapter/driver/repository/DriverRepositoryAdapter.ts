import { Driver } from "@core/domain/driver/entity/Driver";
import { DriverRepositoryPort } from "@core/domain/driver/port/repository/DriverRepositoryPort";

export class DriverRepositoryAdapter implements DriverRepositoryPort {
  getDriverByMinimunDistance(distance: number): Promise<Driver[]> {
    throw new Error("Method not implemented.");
  }
}
