import { Optional } from "@core/common/type/CommonTypes";
import { IsNumber, IsString } from "class-validator";
import {
  ClassValidationDetails,
  ClassValidationErrors,
  ClassValidator,
} from "@core/common/util/classValidator/ClassValidator";
import { Code } from "@core/common/code/Code";

class MockClass {
  @IsString()
  public stringProperty: string;

  @IsNumber()
  public numberProperty: number;

  constructor(stringProperty: string, numberProperty: number) {
    this.stringProperty = stringProperty;
    this.numberProperty = numberProperty;
  }
}

describe("ClassValidator", () => {
  describe("validate", () => {
    test("should return undefined when the object is valid", async () => {
      const validInstance = new MockClass("String", 33);

      await expect(ClassValidator.validate(validInstance)).resolves.toBeNull();
    });

    test("should return validation details when the object is invalid", async () => {
      const invalidInstance = new MockClass(
        33 as unknown as string,
        "33" as unknown as number
      );

      const validationDetails: Optional<ClassValidationDetails> =
        await ClassValidator.validate(invalidInstance);

      const normalizedErrors = normalizeValidationMessages(
        validationDetails.errors
      );

      expect(validationDetails).toBeDefined();
      expect(validationDetails.error_code).toBe(
        Code.BAD_REQUEST_ERROR.error_code
      );
      expect(validationDetails.error_description).toBe(
        Code.BAD_REQUEST_ERROR.message
      );

      expect(validationDetails.errors).toHaveLength(2);
      expect(normalizedErrors).toEqual([
        {
          property: "stringProperty",
          message: ["stringProperty must be a string"],
        },
        {
          property: "numberProperty",
          message: ["numberProperty must be a number"],
        },
      ]);
    });
  });
});

function normalizeValidationMessages(
  errors: ClassValidationErrors[]
): ClassValidationErrors[] {
  return errors.map((error) => ({
    property: error.property,
    message: error.message.map((msg) =>
      msg.replace(/ conforming to the specified constraints/, "")
    ),
  }));
}
