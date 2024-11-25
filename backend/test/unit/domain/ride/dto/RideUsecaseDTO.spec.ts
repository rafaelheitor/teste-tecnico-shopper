import { RideUsecaseDTO } from "@core/domain/ride/usecase/dto/RideUsecaseDto";
import { CreateRideEntityFixture } from "@test/fixtures/ride/CreateRideEntityFixture";

describe("RideUsecaseDTO", () => {
  test("Should create a valid instance of RideUsecaseDTO with a estimate ride", async () => {
    const entity = await CreateRideEntityFixture.newCompletedRide();

    const dto = RideUsecaseDTO.fromEntity(entity);

    expect(dto).toEqual(entity);
  });

  test("Should create a valid instance of RideUsecaseDTO with a completed ride", async () => {
    const entity = await CreateRideEntityFixture.newEstimateRide();

    const dto = RideUsecaseDTO.fromEntity(entity);
    expect(dto).toEqual(entity);
  });

  test("Should create a valid list of RideUsecaseDTO", async () => {
    const entity = await CreateRideEntityFixture.newEstimateRide();

    const dto = RideUsecaseDTO.fromEntityList([entity]);
    expect(dto[0]).toEqual(entity);
  });
});
