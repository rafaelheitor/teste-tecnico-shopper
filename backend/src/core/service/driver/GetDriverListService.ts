import { Driver } from "@core/domain/driver/entity/Driver";
import { DriverRepositoryPort } from "@core/domain/driver/port/repository/DriverRepositoryPort";
import { GetDriverListPort } from "@core/domain/driver/port/usecase/GetDriverListPort";
import { GetDriverListUsecase } from "@core/domain/driver/usecase/GetDriverListUsecase";

export class GetDriverListService implements GetDriverListUsecase {
  constructor(private readonly driverRepository: DriverRepositoryPort) {}

  async execute(port?: GetDriverListPort): Promise<Driver[]> {
    const driverList = await this.driverRepository.getDriverByMinimunDistance(
      port.distance
    );
    return driverList;
  }
}
