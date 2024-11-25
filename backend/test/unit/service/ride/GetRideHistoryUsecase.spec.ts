import { Code } from "@core/common/code/Code";
import { Exception } from "@core/common/exception/Exception";
import { DriverDITokens } from "@core/domain/driver/di/DriverDITokens";
import { DriverRepositoryPort } from "@core/domain/driver/port/repository/DriverRepositoryPort";
import { RideDITokens } from "@core/domain/ride/di/RideDITokens";
import { RideRepositoryPort } from "@core/domain/ride/port/repository/RideRepositoryPort";
import { RideUsecaseDTO } from "@core/domain/ride/usecase/dto/RideUsecaseDto";
import { SavedRideUsecaseDTO } from "@core/domain/ride/usecase/dto/SavedRideUsecaseDTO";
import { GetRideHistoryUsecase } from "@core/domain/ride/usecase/GetRideHistoryUsecase";
import { GetDriverByIdService } from "@core/service/driver/GetDriverByIdService";
import { GetRideHistoryService } from "@core/service/ride/GetRideHistoryService";
import { DriverRepositoryAdapter } from "@infrastructure/adapter/driver/repository/DriverRepositoryAdapter";
import { RideRepositoryAdapter } from "@infrastructure/adapter/ride/repository/RideRepositoryAdapter";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateDriverEntityFixture } from "@test/fixtures/driver/CreateDriverEntityFixture";
import { CreateRideEntityFixture } from "@test/fixtures/ride/CreateRideEntityFixture";

describe("GetRideHistoryUsecase", () => {
  let getRideHistoryUsecase: GetRideHistoryUsecase;
  let rideRepository: RideRepositoryPort;
  let driverRepository: DriverRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RideDITokens.GetRideHistoryUsecase,
          useFactory: (rideRepository, getDriverByIdUsecase) =>
            new GetRideHistoryService(rideRepository, getDriverByIdUsecase),
          inject: [
            RideDITokens.RideRepositoryPort,
            DriverDITokens.GetDriverByIdUsecase,
          ],
        },
        {
          provide: RideDITokens.RideRepositoryPort,
          useClass: RideRepositoryAdapter,
        },
        {
          provide: DriverDITokens.GetDriverByIdUsecase,
          useFactory: (driverRepository) =>
            new GetDriverByIdService(driverRepository),
          inject: [DriverDITokens.DriverRepositoryPort],
        },
        {
          provide: DriverDITokens.DriverRepositoryPort,
          useClass: DriverRepositoryAdapter,
        },
      ],
    }).compile();

    getRideHistoryUsecase = module.get<GetRideHistoryUsecase>(
      RideDITokens.GetRideHistoryUsecase
    );

    rideRepository = module.get<RideRepositoryPort>(
      RideDITokens.RideRepositoryPort
    );

    driverRepository = module.get<DriverRepositoryPort>(
      DriverDITokens.DriverRepositoryPort
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should return list of completed rides", async () => {
    const mockRide = await CreateRideEntityFixture.newCompletedRide();
    const mockDTO = RideUsecaseDTO.fromEntityList([mockRide]);

    jest.spyOn(rideRepository, "getSavedRides").mockResolvedValue([mockRide]);

    const expectedDTO = SavedRideUsecaseDTO.new(mockDTO);

    jest
      .spyOn(driverRepository, "getById")
      .mockResolvedValue(await CreateDriverEntityFixture.new());

    const rideList = await getRideHistoryUsecase.execute({
      customer_id: "1",
      driver_id: 1,
    });

    expect(rideList).toBeDefined();
    expect(rideList).toEqual(expectedDTO);
  });

  test("Should throw Exception when driver was not found", async () => {
    const mockRide = await CreateRideEntityFixture.newCompletedRide();

    jest.spyOn(rideRepository, "getSavedRides").mockResolvedValue([mockRide]);

    jest.spyOn(driverRepository, "getById").mockResolvedValue(undefined);

    await expect(
      getRideHistoryUsecase.execute({
        customer_id: "1",
        driver_id: 1,
      })
    ).rejects.toThrow(Exception.new({ code: Code.DRIVER_NOT_FOUND }));
  });

  test("Should not query driver if driver id was not passed", async () => {
    const mockRide = await CreateRideEntityFixture.newCompletedRide();

    jest.spyOn(rideRepository, "getSavedRides").mockResolvedValue([mockRide]);

    const getDriverById = jest.spyOn(driverRepository, "getById");

    await getRideHistoryUsecase.execute({
      customer_id: "1",
    });

    expect(getDriverById).not.toHaveBeenCalled();
  });

  test("Should throw exception if none ride was found", async () => {
    jest.spyOn(rideRepository, "getSavedRides").mockResolvedValue(undefined);

    await expect(
      getRideHistoryUsecase.execute({
        customer_id: "1",
      })
    ).rejects.toThrow(Exception.new({ code: Code.NO_RIDES_FOUND }));
  });
});
