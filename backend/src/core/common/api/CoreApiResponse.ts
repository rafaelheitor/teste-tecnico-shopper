export class CoreApiResponse<TData extends Record<string, any>> {
  public readonly code: number;
  public readonly message: string;
  public readonly success: boolean;

  private constructor(code?: number, message?: string, data?: TData) {
    this.code = code || 200;
    this.message = message || "Operação realizada com sucesso";
    this.success = true;

    if (data) {
      Object.assign(this, data);
    }
  }

  public static success<TData extends Record<string, any>>(
    data?: TData
  ): CoreApiResponse<TData> {
    return new CoreApiResponse(200, "Operação realizada com sucesso", data);
  }
}
