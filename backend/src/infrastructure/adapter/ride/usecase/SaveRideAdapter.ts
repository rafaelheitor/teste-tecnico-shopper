import { UseCaseValidatableAdapter } from "@core/common/adapter/usecase/UsecaseValidatableAdapter";
import { IsNotEqualTo } from "@core/common/util/classValidator/ClassValidator";
import { EstimateRidePort } from "@core/domain/ride/port/usecase/EstimateRideUsecasePort";
import { SaveRidePort } from "@core/domain/ride/port/usecase/SaveRidePort";
import { plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SaveRideAdapter
  extends UseCaseValidatableAdapter
  implements SaveRidePort
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

  driver: { id: number; name: string };

  @IsNumber()
  distance: number;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsNumber()
  value: number;

  public static async new(payload: SaveRidePort): Promise<SaveRideAdapter> {
    const adapter = plainToInstance(SaveRideAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
