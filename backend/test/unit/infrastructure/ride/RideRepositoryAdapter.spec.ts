import { InfrastructureDITokens } from "@core/common/di/InfrastructureDITokens";
import { RideDITokens } from "@core/domain/ride/di/RideDITokens";
import { RideRepositoryPort } from "@core/domain/ride/port/repository/RideRepositoryPort";
import { PrismaService } from "@infrastructure/adapter/ORM/PrismaService";
import { RideRepositoryAdapter } from "@infrastructure/adapter/ride/repository/RideRepositoryAdapter";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateRideEntityFixture } from "@test/fixtures/ride/CreateRideEntityFixture";

describe("RideRepositoryAdapter", () => {
  let rideRepository: RideRepositoryPort;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RideDITokens.RideRepositoryPort,
          useFactory: (prismaService) =>
            new RideRepositoryAdapter(prismaService),
          inject: [InfrastructureDITokens.PrismaClient],
        },
        {
          provide: InfrastructureDITokens.PrismaClient,
          useClass: PrismaService,
        },
      ],
    }).compile();

    rideRepository = module.get<RideRepositoryPort>(
      RideDITokens.RideRepositoryPort
    );
    prismaService = module.get<PrismaService>(
      InfrastructureDITokens.PrismaClient
    );
  });
  test("save", async () => {
    const completedRide = await CreateRideEntityFixture.newCompletedRide();

    jest.spyOn(prismaService.ride, "create").mockResolvedValue({
      id: 1,
      customer_id: "1",
      origin: "Rua João Ribeiro, 100, kennedy, Alagoinhas",
      destination: "Rua Elvira Dorea, centro, Alagoinhas",
      distance: 2127,
      driver: { id: 1, name: "Homer Simpson" },
      duration: "6 minutos",
      value: 5.71,
      date: new Date(),
    });

    const saved = await rideRepository.save(completedRide);

    expect(saved).toBeDefined();
  });

  describe("getSavedRides", () => {
    test("found rides", async () => {
      jest.spyOn(prismaService.ride, "findMany").mockResolvedValue([
        {
          id: 1,
          customer_id: "1",
          origin: "Rua João Ribeiro, 100, kennedy, Alagoinhas",
          destination: "Rua Elvira Dorea, centro, Alagoinhas",
          distance: 2127,
          driver: { id: 1, name: "Homer Simpson" },
          duration: "6 minutos",
          value: 5.71,
          date: new Date(),
        },
      ]);

      const savedRideList = await rideRepository.getSavedRides({
        customer_id: "1",
        driver_id: 1,
      });

      expect(savedRideList.length).toBeGreaterThanOrEqual(1);
    });

    test("not found rides", async () => {
      jest.spyOn(prismaService.ride, "findMany").mockResolvedValue(undefined);

      const savedRideList = await rideRepository.getSavedRides({
        customer_id: "1",
        driver_id: 1,
      });

      expect(savedRideList).not.toBeDefined();
    });
  });
});
