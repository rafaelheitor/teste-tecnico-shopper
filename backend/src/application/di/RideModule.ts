import { InfrastructureDITokens } from "@core/common/di/InfrastructureDITokens";
import { DriverDITokens } from "@core/domain/driver/di/DriverDITokens";
import { RideDITokens } from "@core/domain/ride/di/RideDITokens";
import { EstimateRideService } from "@core/service/ride/EstimateRideService";
import { RoutesGatewayAdapter } from "@infrastructure/adapter/ride/gateway/RideGatewayAdapter";
import { Module, Provider } from "@nestjs/common";
import { InfrastructureModule } from "./InfrastructureModule";
import { DriverModule } from "./DriverModule";
import { RideController } from "@application/http-rest/controller/RideController";
import { SaveRideService } from "@core/service/ride/SaveRideService";
import { RideRepositoryAdapter } from "@infrastructure/adapter/ride/repository/RideRepositoryAdapter";

const providers: Provider[] = [
  {
    provide: RideDITokens.EstimateRideUsecase,
    useFactory: (routesGateway, getDriverListUsecase) =>
      new EstimateRideService(routesGateway, getDriverListUsecase),
    inject: [
      RideDITokens.RoutesGatewayPort,
      DriverDITokens.GetDriverListUsecase,
    ],
  },
  {
    provide: RideDITokens.SaveRideUsecase,
    useFactory: (rideRepository, getDriverByIdUsecase) =>
      new SaveRideService(rideRepository, getDriverByIdUsecase),
    inject: [
      RideDITokens.RideRepositoryPort,
      DriverDITokens.GetDriverByIdUsecase,
    ],
  },
  {
    provide: RideDITokens.RoutesGatewayPort,
    useFactory: (httpClient) => new RoutesGatewayAdapter(httpClient),
    inject: [InfrastructureDITokens.HttpClient],
  },
  {
    provide: RideDITokens.RideRepositoryPort,
    useFactory: (prismaClient) => new RideRepositoryAdapter(prismaClient),
    inject: [InfrastructureDITokens.PrismaClient],
  },
];

@Module({
  providers: [...providers],
  imports: [InfrastructureModule, DriverModule],
  controllers: [RideController],
})
export class RideModule {}
