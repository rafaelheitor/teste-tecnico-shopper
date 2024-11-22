import { CoreErrorResponse } from "@core/common/api/CoreErrorResponse";
import { Code } from "@core/common/code/Code";

describe("CoreErrorResponse", () => {
  test("should create an error response with the correct error_code and description for invalid data", () => {
    const errorResponse = CoreErrorResponse.create({
      code: Code.BAD_REQUEST_ERROR,
      errorCode: Code.BAD_REQUEST_ERROR.error_code,
    });

    expect(errorResponse.error_code).toBe(Code.BAD_REQUEST_ERROR.error_code);
    expect(errorResponse.error_description).toBe(
      "Os dados fornecidos no corpo da requisição são inválidos"
    );
  });

  test("should create an error response with the correct error_code and description for driver not found", () => {
    const errorResponse = CoreErrorResponse.create({
      code: Code.DRIVER_NOT_FOUND,
      errorCode: Code.DRIVER_NOT_FOUND.error_code,
    });

    expect(errorResponse.error_code).toBe(Code.DRIVER_NOT_FOUND.error_code);
    expect(errorResponse.error_description).toBe("Motorista não encontrado");
  });

  test("should create an error response with the correct error_code and description for invalid distance", () => {
    const errorResponse = CoreErrorResponse.create({
      code: Code.INVALID_DISTANCE,
      errorCode: Code.INVALID_DISTANCE.error_code,
    });

    expect(errorResponse.error_code).toBe(Code.INVALID_DISTANCE.error_code);
    expect(errorResponse.error_description).toBe(
      "Quilometragem inválida para o motorista"
    );
  });
});
