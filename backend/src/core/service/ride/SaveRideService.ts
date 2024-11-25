import { Code } from "@core/common/code/Code";
import { Exception } from "@core/common/exception/Exception";
import { GetDriverByIdUsecase } from "@core/domain/driver/usecase/GetDriverByIdUsecase";
import { Ride } from "@core/domain/ride/entity/Ride";
import { RideRepositoryPort } from "@core/domain/ride/port/repository/RideRepositoryPort";
import { SaveRidePort } from "@core/domain/ride/port/usecase/SaveRidePort";
import { RideUsecaseDTO } from "@core/domain/ride/usecase/dto/RideUsecaseDto";
import { SaveRideUsecase } from "@core/domain/ride/usecase/SaveRideUsecase";

export class SaveRideService implements SaveRideUsecase {
  constructor(
    private readonly rideRepository: RideRepositoryPort,
    private readonly getDriverByIdUsecase: GetDriverByIdUsecase
  ) {}

  async execute(port?: SaveRidePort): Promise<RideUsecaseDTO> {
    const driver = await this.getDriverByIdUsecase.execute({
      id: port.driver.id,
    });

    const distanceInKm = port.distance / 1000;

    const invalidMinimumDistance = distanceInKm < driver.minimunDistance;

    if (invalidMinimumDistance)
      throw Exception.new({ code: Code.INVALID_DISTANCE });

    const ride = await Ride.fromPayload({
      customer_id: port.customer_id,
      origin: port.origin,
      destination: port.destination,
      distance: port.distance,
      duration: port.duration,
      driver: {
        id: driver.id,
        name: driver.name,
      },
      date: new Date(),
      value: port.value,
    });

    await this.rideRepository.save(ride);
    return RideUsecaseDTO.fromEntity(ride);
  }
}
