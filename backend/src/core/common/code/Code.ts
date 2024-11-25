export type CodeDescription = {
  code: number;
  message: string;
  error_code: string;
};

export class Code {
  public static ENTITY_VALIDATION_ERROR: CodeDescription = {
    error_code: "ENTITY_VALIDATION_ERROR",
    code: 1001,
    message: "Entity validation error",
  };

  public static BAD_REQUEST_ERROR: CodeDescription = {
    error_code: "INVALID_DATA",
    code: 400,
    message: "Os dados fornecidos no corpo da requisição são inválidos",
  };

  public static DRIVER_NOT_FOUND: CodeDescription = {
    error_code: "DRIVER_NOT_FOUND",
    code: 404,
    message: "Motorista não encontrado",
  };

  public static NO_RIDES_FOUND: CodeDescription = {
    error_code: "NO_RIDES_FOUND",
    code: 404,
    message: "Nenhum registro encontrado",
  };

  public static INVALID_DISTANCE: CodeDescription = {
    error_code: "INVALID_DISTANCE",
    code: 406,
    message: "Quilometragem inválida para o motorista",
  };

  public static INTERNAL_ERROR: CodeDescription = {
    error_code: "INTERNAL_ERROR",
    code: 500,
    message: "Internal Error",
  };
}
