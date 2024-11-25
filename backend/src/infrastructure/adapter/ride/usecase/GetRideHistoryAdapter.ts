import { UseCaseValidatableAdapter } from "@core/common/adapter/usecase/UsecaseValidatableAdapter";
import { GetRideHistoryPort } from "@core/domain/ride/port/usecase/GetRideHistoryPort";
import { plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class GetRideHistoryAdapter
  extends UseCaseValidatableAdapter
  implements GetRideHistoryPort
{
  @IsString()
  @IsNotEmpty()
  customer_id: string;

  @IsNumber()
  @IsOptional()
  driver_id?: number;

  public static async new(payload: GetRideHistoryPort) {
    const adapter = plainToInstance(GetRideHistoryAdapter, payload);

    await adapter.validate();
    return adapter;
  }
}
