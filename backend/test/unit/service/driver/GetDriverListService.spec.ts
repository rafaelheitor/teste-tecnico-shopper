import { DriverDITokens } from "@core/domain/driver/di/DriverDITokens";
import { DriverRepositoryPort } from "@core/domain/driver/port/repository/DriverRepositoryPort";
import { DriverUsecaseDTO } from "@core/domain/driver/port/usecase/dto/DriverUsecaseDTO";
import { GetDriverListUsecase } from "@core/domain/driver/usecase/GetDriverListUsecase";
import { GetDriverListService } from "@core/service/driver/GetDriverListService";
import { DriverRepositoryAdapter } from "@infrastructure/adapter/driver/repository/DriverRepositoryAdapter";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateDriverEntityFixture } from "@test/fixtures/driver/CreateDriverEntityFixture";

describe("GetDriverListService", () => {
  let getDriverListUsecase: GetDriverListUsecase;
  let driverRepository: DriverRepositoryPort;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DriverDITokens.GetDriverListUsecase,
          useFactory: (driverRepository) =>
            new GetDriverListService(driverRepository),
          inject: [DriverDITokens.DriverRepositoryPort],
        },
        {
          provide: DriverDITokens.DriverRepositoryPort,
          useClass: DriverRepositoryAdapter,
        },
      ],
    }).compile();

    getDriverListUsecase = module.get<GetDriverListUsecase>(
      DriverDITokens.GetDriverListUsecase
    );

    driverRepository = module.get<DriverRepositoryPort>(
      DriverDITokens.DriverRepositoryPort
    );
  });

  test("Should return a list of drivers with a minimum distance less than or equal to the given distance", async () => {
    const driver = await CreateDriverEntityFixture.new();

    const getDriverListMethod = jest
      .spyOn(driverRepository, "getDriverByMinimunDistance")
      .mockImplementation(async () => {
        return [driver];
      });

    const expectedUsecaseDto = DriverUsecaseDTO.fromEntity(driver);

    const result: DriverUsecaseDTO[] = await getDriverListUsecase.execute({
      distance: 3,
    });

    expect(result[0]).toStrictEqual(expectedUsecaseDto);
    expect(getDriverListMethod).toHaveBeenCalled();
  });
});
