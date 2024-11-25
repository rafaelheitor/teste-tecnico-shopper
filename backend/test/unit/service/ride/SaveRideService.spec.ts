import { Code } from "@core/common/code/Code";
import { Exception } from "@core/common/exception/Exception";
import { DriverDITokens } from "@core/domain/driver/di/DriverDITokens";
import { DriverUsecaseDTO } from "@core/domain/driver/port/usecase/dto/DriverUsecaseDTO";
import { GetDriverByIdUsecase } from "@core/domain/driver/usecase/GetDriverByIdUsecase";
import { RideDITokens } from "@core/domain/ride/di/RideDITokens";
import { Ride } from "@core/domain/ride/entity/Ride";
import { RideRepositoryPort } from "@core/domain/ride/port/repository/RideRepositoryPort";
import { RideUsecaseDTO } from "@core/domain/ride/usecase/dto/RideUsecaseDto";
import { SaveRideUsecase } from "@core/domain/ride/usecase/SaveRideUsecase";
import { GetDriverByIdService } from "@core/service/driver/GetDriverByIdService";
import { SaveRideService } from "@core/service/ride/SaveRideService";
import { RideRepositoryAdapter } from "@infrastructure/adapter/ride/repository/RideRepositoryAdapter";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateDriverEntityFixture } from "@test/fixtures/driver/CreateDriverEntityFixture";

describe("SaveRideService", () => {
  let saveRideUsecase: SaveRideUsecase;
  let getDriverByIdUsecase: GetDriverByIdUsecase;
  let rideRepository: RideRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
          provide: DriverDITokens.GetDriverByIdUsecase,
          useClass: GetDriverByIdService,
        },
        {
          provide: RideDITokens.RideRepositoryPort,
          useClass: RideRepositoryAdapter,
        },
      ],
    }).compile();

    saveRideUsecase = module.get<SaveRideUsecase>(RideDITokens.SaveRideUsecase);
    getDriverByIdUsecase = module.get<GetDriverByIdUsecase>(
      DriverDITokens.GetDriverByIdUsecase
    );
    rideRepository = module.get<RideRepositoryPort>(
      RideDITokens.RideRepositoryPort
    );
  });

  test("Should validate driver existence, minimum distance, return ride confirmation and save it to the persistence mechanism", async () => {
    const driver = await CreateDriverEntityFixture.new();
    const driverDTO = DriverUsecaseDTO.fromEntity(driver);

    const getDriverMethod = jest
      .spyOn(getDriverByIdUsecase, "execute")
      .mockResolvedValue(driverDTO);

    const payload = {
      customer_id: "1",
      origin: "Rua João Ribeiro, 100, kennedy, Alagoinhas",
      destination: "Rua Elvira Dorea, centro, Alagoinhas",
      distance: 2127,
      driver: { id: 1, name: "Homer Simpson" },
      duration: "6 minutos",
      value: 5.71,
    };

    const mockEntity = await Ride.fromPayload(payload);
    const expectedDTO = RideUsecaseDTO.fromEntity(mockEntity);

    const saveRideMethod = jest
      .spyOn(rideRepository, "save")
      .mockResolvedValue(mockEntity);

    const resultDTO = await saveRideUsecase.execute(payload);
    Reflect.set(expectedDTO, "date", resultDTO.date);

    expect(resultDTO).toStrictEqual(expectedDTO);
    expect(getDriverMethod).toHaveBeenCalled();
    expect(saveRideMethod).toHaveBeenCalled();
  });

  test("Should throw Exception if distance is less than driver minimum distance", async () => {
    const driver = await CreateDriverEntityFixture.new();
    const driverDTO = DriverUsecaseDTO.fromEntity(driver);

    jest.spyOn(getDriverByIdUsecase, "execute").mockResolvedValue(driverDTO);

    const payload = {
      customer_id: "1",
      origin: "Rua João Ribeiro, 100, kennedy, Alagoinhas",
      destination: "Rua Elvira Dorea, centro, Alagoinhas",
      distance: 800,
      driver: { id: 1, name: "Homer Simpson" },
      duration: "6 minutos",
      value: 1.8,
    };

    await expect(saveRideUsecase.execute(payload)).rejects.toThrow(
      Exception.new({ code: Code.INVALID_DISTANCE })
    );
  });
});
