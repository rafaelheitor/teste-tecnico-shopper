import { Optional } from "../type/CommonTypes";
import { CodeDescription } from "../code/Code";

export type createExceptionPayload<TData> = {
  code: CodeDescription;
  overrideMessage?: string;
  data?: TData;
};

export class Exception<TData> extends Error {
  public readonly code: number;
  public readonly data: Optional<TData>;
  public readonly error_code: string;

  private constructor(
    codeDescription: CodeDescription,
    overrideMessage?: string,
    data?: TData
  ) {
    super();

    this.name = this.constructor.name;
    this.code = codeDescription.code;
    this.data = data;
    this.message = overrideMessage || codeDescription.message;
    this.error_code = codeDescription.error_code;
  }

  static new<TData>(payload: createExceptionPayload<TData>): Exception<TData> {
    return new Exception(payload.code, payload.overrideMessage, payload.data);
  }
}
