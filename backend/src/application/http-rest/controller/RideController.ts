import { CoreApiResponse } from "@core/common/api/CoreApiResponse";
import { RideDITokens } from "@core/domain/ride/di/RideDITokens";
import { EstimateRideUsecase } from "@core/domain/ride/usecase/EstimateRideUsecase";
import { EstimateRideAdapter } from "@infrastructure/adapter/ride/usecase/EstimateRideAdapter";
import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Patch,
  Post,
} from "@nestjs/common";
import { EstimateRideCommandModel } from "./documentation/ride/EstimateRideCommandModel";
import { ApiTags } from "@nestjs/swagger";
import { SaveRideUsecase } from "@core/domain/ride/usecase/SaveRideUsecase";
import { SaveRideAdapter } from "@infrastructure/adapter/ride/usecase/SaveRideAdapter";
import { SaveRideCommandModel } from "./documentation/ride/SaveRideCommandModel";

@Controller("ride")
@ApiTags("Ride")
export class RideController {
  constructor(
    @Inject(RideDITokens.EstimateRideUsecase)
    private readonly estimateRideUsecase: EstimateRideUsecase,

    @Inject(RideDITokens.SaveRideUsecase)
    private readonly saveRideUsecase: SaveRideUsecase
  ) {}

  @Post("estimate")
  @HttpCode(200)
  async estimate(@Body() body: EstimateRideCommandModel) {
    const adapter = await EstimateRideAdapter.new(body);
    const result = await this.estimateRideUsecase.execute(adapter);

    return CoreApiResponse.success(result);
  }

  @Patch("confirm")
  @HttpCode(200)
  async confirm(@Body() body: SaveRideCommandModel) {
    const adapter = await SaveRideAdapter.new({
      ...body,
      value: parseFloat(`${body.value}`),
      distance: parseInt(`${body.distance}`),
    });
    await this.saveRideUsecase.execute(adapter);

    return CoreApiResponse.success();
  }
}
