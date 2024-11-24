import { CoreApiResponse } from "@core/common/api/CoreApiResponse";
import { RideDITokens } from "@core/domain/ride/di/RideDITokens";
import { EstimateRideUsecase } from "@core/domain/ride/usecase/EstimateRideUsecase";
import { EstimateRideAdapter } from "@infrastructure/adapter/ride/usecase/EstimateRideAdapter";
import { Body, Controller, HttpCode, Inject, Post } from "@nestjs/common";
import { EstimateRideCommandModel } from "./documentation/ride/EstimateRideCommandModel";
import { ApiTags } from "@nestjs/swagger";

@Controller("ride")
@ApiTags("Ride")
export class RideController {
  constructor(
    @Inject(RideDITokens.EstimateRideUsecase)
    private readonly estimateRideUsecase: EstimateRideUsecase
  ) {}

  @Post("estimate")
  @HttpCode(200)
  async estimate(@Body() body: EstimateRideCommandModel) {
    const adapter = await EstimateRideAdapter.new(body);
    const result = await this.estimateRideUsecase.execute(adapter);

    return CoreApiResponse.success(result);
  }
}
