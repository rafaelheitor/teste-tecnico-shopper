import { Entity } from "@core/common/entity/Entity";
import { Exception } from "@core/common/exception/Exception";
import { Code } from "@core/common/code/Code";
import { v4 } from "uuid";

class MockEntity extends Entity<string> {
  public name: string;

  constructor(id: string, name: string) {
    super();
    this.id = id;
    this.name = name;
  }
}

describe("Entity creation", () => {
  test("When id is set, it should return id", () => {
    const id: string = v4();
    const entity = new MockEntity(id, "Rafael");

    expect(entity.getId()).toBe(id);
  });

  test("When id is undefined, it should throw a exception", async () => {
    const id: unknown = undefined;
    const entity = new MockEntity(id as string, "Rafael");

    expect.hasAssertions();

    try {
      await entity.getId();
    } catch (e) {
      const exception: Exception<void> = e as Exception<void>;

      expect(exception).toBeInstanceOf(Exception);
      expect(exception.code).toBe(Code.ENTITY_VALIDATION_ERROR.code);
      expect(exception.message).toBe("MockEntity: ID is empty");
    }
  });
});
