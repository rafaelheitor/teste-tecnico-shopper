import { GetDriverListUsecase } from "@core/domain/driver/usecase/GetDriverListUsecase";
import { Ride } from "@core/domain/ride/entity/Ride";
import { RideHelper } from "@core/domain/ride/entity/RideHelper";
import { RoutesGatewayPort } from "@core/domain/ride/port/gateway/RoutesGatewayPort";
import { EstimateRidePort } from "@core/domain/ride/port/usecase/EstimateRideUsecasePort";
import { RideUsecaseDTO } from "@core/domain/ride/usecase/dto/RideUsecaseDto";
import { EstimateRideUsecase } from "@core/domain/ride/usecase/EstimateRideUsecase";

export class EstimateRideService implements EstimateRideUsecase {
  constructor(
    private readonly routesGateway: RoutesGatewayPort,
    private readonly getDriverListUsecase: GetDriverListUsecase
  ) {}

  async execute(port?: EstimateRidePort): Promise<RideUsecaseDTO> {
    const origin = await this.routesGateway.getLatLongFromAddress(port.origin);
    const destination = await this.routesGateway.getLatLongFromAddress(
      port.destination
    );

    const { distance, duration, routeResponse } =
      await this.routesGateway.getDistanceAndDuration(origin, destination);

    const driverList = await this.getDriverListUsecase.execute({
      distance,
    });

    const ride = await Ride.fromPayload({
      origin: { ...origin },
      destination: { ...destination },
      distance,
      duration: RideHelper.formatDurationFromString(duration),
      options: driverList.map((item) => ({
        id: item.id,
        description: item.description,
        name: item.name,
        review: item.review,
        vehicle: item.vehicle,
        value: RideHelper.calulateCost(parseFloat(`${distance}`), item.tax),
      })),
    });

    return RideUsecaseDTO.fromEntity(ride, routeResponse);
  }
}
