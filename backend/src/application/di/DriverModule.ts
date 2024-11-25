import { InfrastructureDITokens } from "@core/common/di/InfrastructureDITokens";
import { DriverDITokens } from "@core/domain/driver/di/DriverDITokens";
import { GetDriverByIdService } from "@core/service/driver/GetDriverByIdService";
import { GetDriverListService } from "@core/service/driver/GetDriverListService";
import { DriverRepositoryAdapter } from "@infrastructure/adapter/driver/repository/DriverRepositoryAdapter";
import { Module, Provider } from "@nestjs/common";

const providers: Provider[] = [
  {
    provide: DriverDITokens.DriverRepositoryPort,
    useFactory: (prismaClient) => new DriverRepositoryAdapter(prismaClient),
    inject: [InfrastructureDITokens.PrismaClient],
  },
  {
    provide: DriverDITokens.GetDriverListUsecase,
    useFactory: (driverRepository) =>
      new GetDriverListService(driverRepository),
    inject: [DriverDITokens.DriverRepositoryPort],
  },
  {
    provide: DriverDITokens.GetDriverByIdUsecase,
    useFactory: (driverRepository) =>
      new GetDriverByIdService(driverRepository),
    inject: [DriverDITokens.DriverRepositoryPort],
  },
];

@Module({
  providers: [...providers],
  exports: [
    DriverDITokens.GetDriverListUsecase,
    DriverDITokens.GetDriverByIdUsecase,
  ],
})
export class DriverModule {}
