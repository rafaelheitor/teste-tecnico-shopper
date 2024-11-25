import { Code } from "@core/common/code/Code";
import { Exception } from "@core/common/exception/Exception";
import { DriverDITokens } from "@core/domain/driver/di/DriverDITokens";
import { DriverRepositoryPort } from "@core/domain/driver/port/repository/DriverRepositoryPort";
import { GetDriverByIdUsecase } from "@core/domain/driver/usecase/GetDriverByIdUsecase";
import { GetDriverByIdService } from "@core/service/driver/GetDriverByIdService";
import { DriverRepositoryAdapter } from "@infrastructure/adapter/driver/repository/DriverRepositoryAdapter";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateDriverEntityFixture } from "@test/fixtures/driver/CreateDriverEntityFixture";

describe("GetDriverByIdService", () => {
  let getDriverByIdUsecase: GetDriverByIdUsecase;
  let driverRepository: DriverRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

    getDriverByIdUsecase = module.get<GetDriverByIdUsecase>(
      DriverDITokens.GetDriverByIdUsecase
    );

    driverRepository = module.get<DriverRepositoryPort>(
      DriverDITokens.DriverRepositoryPort
    );
  });
  test("Should return driver with given id", async () => {
    const mockDriver = await CreateDriverEntityFixture.new();

    const getDriverByIdMethod = jest
      .spyOn(driverRepository, "getById")
      .mockResolvedValue(mockDriver);

    const driver = await getDriverByIdUsecase.execute({ id: 1 });

    expect(driver).toBeDefined();
    expect(getDriverByIdMethod).toHaveBeenCalled();
  });
  test("Should throw error when driver was not found", async () => {
    jest.spyOn(driverRepository, "getById").mockResolvedValue(undefined);

    await expect(getDriverByIdUsecase.execute({ id: 1 })).rejects.toThrow(
      Exception.new({ code: Code.DRIVER_NOT_FOUND })
    );
  });
});
