import { Code } from "@core/common/code/Code";
import { Exception } from "@core/common/exception/Exception";
import { DriverRepositoryPort } from "@core/domain/driver/port/repository/DriverRepositoryPort";
import { DriverUsecaseDTO } from "@core/domain/driver/port/usecase/dto/DriverUsecaseDTO";
import { GetDriverByIdPort } from "@core/domain/driver/port/usecase/GetDriverByIdPort";
import { GetDriverByIdUsecase } from "@core/domain/driver/usecase/GetDriverByIdUsecase";

export class GetDriverByIdService implements GetDriverByIdUsecase {
  constructor(private readonly driverRepository: DriverRepositoryPort) {}

  async execute(port?: GetDriverByIdPort): Promise<DriverUsecaseDTO> {
    const driver = await this.driverRepository.getById(port.id);

    if (!driver) throw Exception.new({ code: Code.DRIVER_NOT_FOUND });

    return DriverUsecaseDTO.fromEntity(driver);
  }
}
