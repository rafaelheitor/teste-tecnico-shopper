import { DriverDITokens } from "@core/domain/driver/di/DriverDITokens";
import { DriverUsecaseDTO } from "@core/domain/driver/port/usecase/dto/DriverUsecaseDTO";
import { GetDriverListUsecase } from "@core/domain/driver/usecase/GetDriverListUsecase";
import { RideDITokens } from "@core/domain/ride/di/RideDITokens";
import { RoutesGatewayPort } from "@core/domain/ride/port/gateway/RoutesGatewayPort";
import { RideUsecaseDTO } from "@core/domain/ride/usecase/dto/RideUsecaseDto";
import { EstimateRideUsecase } from "@core/domain/ride/usecase/EstimateRideUsecase";
import { GetDriverListService } from "@core/service/driver/GetDriverListService";
import { EstimateRideService } from "@core/service/ride/EstimateRideService";
import { RoutesGatewayAdapter } from "@infrastructure/adapter/ride/RideGatewayAdapter";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateDriverEntityFixture } from "@test/fixtures/driver/CreateDriverEntityFixture";
import { CreateRideEntityFixture } from "@test/fixtures/ride/CreateRideEntityFixture";

describe("EstimateRideService", () => {
  let estimateRideUsecase: EstimateRideUsecase;
  let routesGateway: RoutesGatewayPort;
  let getDriverListUsecase: GetDriverListUsecase;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
          provide: RideDITokens.RoutesGatewayPort,
          useClass: RoutesGatewayAdapter,
        },
        {
          provide: DriverDITokens.GetDriverListUsecase,
          useClass: GetDriverListService,
        },
      ],
    }).compile();

    estimateRideUsecase = module.get<EstimateRideUsecase>(
      RideDITokens.EstimateRideUsecase
    );
    routesGateway = module.get<RoutesGatewayPort>(
      RideDITokens.RoutesGatewayPort
    );
    getDriverListUsecase = module.get<GetDriverListUsecase>(
      DriverDITokens.GetDriverListUsecase
    );
  });

  test("Should estimate ride, by getting the necessary user info, available drivers that meets the distance criteria and return info about the ride", async () => {
    const mockRideEntity = await CreateRideEntityFixture.newEstimateRide();
    const expectedUsecaseDTO = RideUsecaseDTO.fromEntity(mockRideEntity);

    const mockOriginLatLong = mockRideEntity.getOrigin();
    const mockDestinationLatLong = mockRideEntity.getDestination();

    const getLatLongFromAddress = jest
      .spyOn(routesGateway, "getLatLongFromAddress")
      .mockResolvedValueOnce(mockOriginLatLong)
      .mockResolvedValueOnce(mockDestinationLatLong);

    const getDistanceAndDuration = jest
      .spyOn(routesGateway, "getDistanceAndDuration")
      .mockResolvedValue({
        distance: 2000,
        duration: "360s",
      });

    const mockDriver = await CreateDriverEntityFixture.new();
    const mockDriverDto = DriverUsecaseDTO.fromEntityList([mockDriver]);

    jest
      .spyOn(getDriverListUsecase, "execute")
      .mockResolvedValue(mockDriverDto);

    const resultUsecaseDTO = await estimateRideUsecase.execute({
      customer_id: "1",
      origin: "Rua Elvira Dórea, 100, Centro, Alagoinhas",
      destination: "Rua João Ribeiro, 107, Kennedy, Alagoinhas",
    });

    expect(expectedUsecaseDTO).toStrictEqual(resultUsecaseDTO);

    expect(getLatLongFromAddress).toHaveBeenCalledTimes(2);
    expect(getDistanceAndDuration).toHaveBeenCalledWith(
      mockOriginLatLong,
      mockDestinationLatLong
    );
  });
});
