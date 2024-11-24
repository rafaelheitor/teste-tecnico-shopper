import { InfrastructureDITokens } from "@core/common/di/InfrastructureDITokens";
import { DriverDITokens } from "@core/domain/driver/di/DriverDITokens";
import { Driver } from "@core/domain/driver/entity/Driver";
import { DriverRepositoryPort } from "@core/domain/driver/port/repository/DriverRepositoryPort";
import { DriverRepositoryAdapter } from "@infrastructure/adapter/driver/repository/DriverRepositoryAdapter";
import { PrismaService } from "@infrastructure/adapter/ORM/PrismaService";
import { Test, TestingModule } from "@nestjs/testing";

describe("DriverRepositoryAdapter", () => {
  let driverRepository: DriverRepositoryPort;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DriverDITokens.DriverRepositoryPort,
          useFactory: (prismaService) =>
            new DriverRepositoryAdapter(prismaService),
          inject: [InfrastructureDITokens.PrismaClient],
        },
        {
          provide: InfrastructureDITokens.PrismaClient,
          useClass: PrismaService,
        },
      ],
    }).compile();

    driverRepository = module.get<DriverRepositoryPort>(
      DriverDITokens.DriverRepositoryPort
    );

    prismaService = module.get<PrismaService>(
      InfrastructureDITokens.PrismaClient
    );
  });
  test("getDriverByMinimunDistance", async () => {
    const result = await driverRepository.getDriverByMinimunDistance(1);
    const mockDriverPayload = {
      id: 1,
      name: "Homer Simpson",
      description:
        "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
      vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
      review: {
        rating: 2,
        comment:
          "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
      },
      tax: 2,
      minimun_distance: 1,
    };

    jest
      .spyOn(prismaService.driver, "findMany")
      .mockResolvedValue([mockDriverPayload]);

    const expectedDriver = await Driver.fromPayload({
      id: mockDriverPayload.id,
      name: mockDriverPayload.name,
      description: mockDriverPayload.description,
      vehicle: mockDriverPayload.vehicle,
      review: mockDriverPayload.review,
      minimunDistance: mockDriverPayload.minimun_distance,
      tax: mockDriverPayload.tax,
    });

    expect(result).toBeDefined();
    expect(result[0]).toStrictEqual(expectedDriver);
  });
});
