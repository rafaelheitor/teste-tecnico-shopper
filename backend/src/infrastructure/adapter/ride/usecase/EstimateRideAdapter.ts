import { UseCaseValidatableAdapter } from "@core/common/adapter/usecase/UsecaseValidatableAdapter";
import { IsNotEqualTo } from "@core/common/util/classValidator/ClassValidator";
import { EstimateRidePort } from "@core/domain/ride/port/usecase/EstimateRideUsecasePort";
import { plainToInstance } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class EstimateRideAdapter
  extends UseCaseValidatableAdapter
  implements EstimateRidePort
{
  @IsString()
  @IsNotEmpty()
  customer_id: string;

  @IsString()
  @IsNotEmpty()
  @IsNotEqualTo("destination")
  origin: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  public static async new(
    payload: EstimateRidePort
  ): Promise<EstimateRideAdapter> {
    const adapter = plainToInstance(EstimateRideAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
