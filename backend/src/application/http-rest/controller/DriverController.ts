import { CoreApiResponse } from "@core/common/api/CoreApiResponse";
import { DriverDITokens } from "@core/domain/driver/di/DriverDITokens";
import { GetDriverListUsecase } from "@core/domain/driver/usecase/GetDriverListUsecase";
import { Controller, Get, Inject } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("driver")
@ApiTags("Driver")
export class DriverController {
  constructor(
    @Inject(DriverDITokens.GetDriverListUsecase)
    private readonly getDriverListUsecase: GetDriverListUsecase
  ) {}

  @Get()
  async getDriverList() {
    const result = await this.getDriverListUsecase.execute({ distance: 10000 });

    return CoreApiResponse.success({ data: result });
  }
}
