import { Nullable } from "@core/common/type/CommonTypes";

export class CoreApiResponse<TData> {
  public readonly code: number;
  public readonly message: string;
  public readonly success: boolean;
  public readonly data: Nullable<TData>;

  private constructor(code?: number, message?: string, data?: TData) {
    this.code = code;
    this.message = message;
    this.data = data || null;
    this.success = true;
  }

  public static success<TData>(data?: TData): CoreApiResponse<TData> {
    return new CoreApiResponse(200, "Operação realizada com sucesso", data);
  }
}
