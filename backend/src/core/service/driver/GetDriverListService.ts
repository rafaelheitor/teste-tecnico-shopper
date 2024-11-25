import { DriverRepositoryPort } from "@core/domain/driver/port/repository/DriverRepositoryPort";
import { DriverUsecaseDTO } from "@core/domain/driver/port/usecase/dto/DriverUsecaseDTO";
import { GetDriverListPort } from "@core/domain/driver/port/usecase/GetDriverListPort";
import { GetDriverListUsecase } from "@core/domain/driver/usecase/GetDriverListUsecase";

export class GetDriverListService implements GetDriverListUsecase {
  constructor(private readonly driverRepository: DriverRepositoryPort) {}

  async execute(port?: GetDriverListPort): Promise<DriverUsecaseDTO[]> {
    const driverList = await this.driverRepository.getDriverByMinimunDistance(
      port.distance
    );

    return DriverUsecaseDTO.fromEntityList(driverList);
  }
}
