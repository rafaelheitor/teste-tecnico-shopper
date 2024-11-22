import { CodeDescription } from "../code/Code";

export type CreateErrorResponsePayload = {
  code: CodeDescription;
  errorCode: string;
};

export class CoreErrorResponse {
  public readonly error_code: string;
  public readonly error_description: string;

  private constructor(codeDescription: CodeDescription, errorCode: string) {
    this.error_code = errorCode;
    this.error_description = codeDescription.message;
  }

  static create(payload: CreateErrorResponsePayload): CoreErrorResponse {
    return new CoreErrorResponse(payload.code, payload.errorCode);
  }
}
