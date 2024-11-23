import { DriverUsecaseDTO } from "@core/domain/driver/port/usecase/dto/DriverUsecaseDTO";
import { CreateDriverEntityFixture } from "@test/fixtures/driver/CreateDriverEntityFixture";
describe("DriverUsecaseDTO", () => {
  test("Should create a valid instance of the DriverUsecaseDTO", async () => {
    const entity = await CreateDriverEntityFixture.new();

    const dto = DriverUsecaseDTO.fromEntity(entity);
    expect(dto).toEqual(entity);
  });
  test("Should create a valid list of the DriverUsecaseDTO", async () => {
    const entity = await CreateDriverEntityFixture.new();

    const dto = DriverUsecaseDTO.fromEntityList([entity]);
    expect(dto[0]).toEqual(entity);
  });
});
