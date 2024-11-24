import { Module } from "@nestjs/common";
import { InfrastructureModule } from "./InfrastructureModule";
import { RideModule } from "./RideModule";
import { DriverModule } from "./DriverModule";

@Module({
  imports: [InfrastructureModule, RideModule, DriverModule],
})
export class RootModule {}
