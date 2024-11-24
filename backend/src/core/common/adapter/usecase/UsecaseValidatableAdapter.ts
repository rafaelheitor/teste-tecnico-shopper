import { Code } from "@core/common/code/Code";
import { Exception } from "@core/common/exception/Exception";
import { Optional } from "@core/common/type/CommonTypes";
import {
  ClassValidationDetails,
  ClassValidator,
} from "@core/common/util/classValidator/ClassValidator";

export class UseCaseValidatableAdapter {
  public async validate(): Promise<void> {
    const details: Optional<ClassValidationDetails> =
      await ClassValidator.validate(this);
    if (details) {
      throw Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        data: details,
      });
    }
  }
}
