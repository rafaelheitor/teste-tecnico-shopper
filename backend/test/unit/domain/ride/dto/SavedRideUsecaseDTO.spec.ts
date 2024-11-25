import { RideUsecaseDTO } from "@core/domain/ride/usecase/dto/RideUsecaseDto";
import { SavedRideUsecaseDTO } from "@core/domain/ride/usecase/dto/SavedRideUsecaseDTO";
import { CreateRideEntityFixture } from "@test/fixtures/ride/CreateRideEntityFixture";

describe("SavedRideUsecaseDTO", () => {
  test("Should create a valid instance of SavedRideUsecaseDTO", async () => {
    const savedRide = await CreateRideEntityFixture.newCompletedRide();
    const rideDTO = RideUsecaseDTO.fromEntityList([savedRide]);

    const dto = SavedRideUsecaseDTO.new(rideDTO);

    expect(dto).toBeDefined();
  });
});
