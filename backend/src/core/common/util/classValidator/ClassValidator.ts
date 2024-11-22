import { Code } from "@core/common/code/Code";
import { Optional } from "@core/common/type/CommonTypes";
import { validate, ValidationError } from "class-validator";

export type ClassValidationDetails = {
  error_code: string;
  error_description: string;
  errors?: ClassValidationErrors[];
};

export type ClassValidationErrors = {
  property: string;
  message: string[];
};

export class ClassValidator {
  public static async validate<TTarget extends object>(
    target: TTarget
  ): Promise<Optional<ClassValidationDetails>> {
    const errors: ValidationError[] = await validate(target);

    if (errors.length > 0) {
      const formattedErrors: ClassValidationErrors[] = errors.map((error) => ({
        property: error.property,
        message: error.constraints ? Object.values(error.constraints) : [],
      }));

      return {
        error_code: Code.BAD_REQUEST_ERROR.error_code,
        error_description: Code.BAD_REQUEST_ERROR.message,
        errors: formattedErrors,
      };
    }

    return null;
  }
}
