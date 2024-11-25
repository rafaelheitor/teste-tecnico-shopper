import { Code } from "@core/common/code/Code";
import { Exception } from "@core/common/exception/Exception";
import { GetDriverByIdUsecase } from "@core/domain/driver/usecase/GetDriverByIdUsecase";
import { RideRepositoryPort } from "@core/domain/ride/port/repository/RideRepositoryPort";
import { GetRideHistoryPort } from "@core/domain/ride/port/usecase/GetRideHistoryPort";
import { RideUsecaseDTO } from "@core/domain/ride/usecase/dto/RideUsecaseDto";
import { SavedRideUsecaseDTO } from "@core/domain/ride/usecase/dto/SavedRideUsecaseDTO";
import { GetRideHistoryUsecase } from "@core/domain/ride/usecase/GetRideHistoryUsecase";

export class GetRideHistoryService implements GetRideHistoryUsecase {
  constructor(
    private readonly rideRepository: RideRepositoryPort,
    private readonly getDriverByIdUsecase: GetDriverByIdUsecase
  ) {}

  async execute(port?: GetRideHistoryPort): Promise<SavedRideUsecaseDTO> {
    if (port.driver_id != undefined)
      await this.validateDriverExistence(port.driver_id);

    const savedRideList = await this.rideRepository.getSavedRides(port);

    if (savedRideList.length == 0)
      throw Exception.new({ code: Code.NO_RIDES_FOUND });

    const dto = RideUsecaseDTO.fromEntityList(savedRideList);
    return SavedRideUsecaseDTO.new(dto);
  }

  async validateDriverExistence(driverId: number) {
    await this.getDriverByIdUsecase.execute({ id: driverId });
  }
}
