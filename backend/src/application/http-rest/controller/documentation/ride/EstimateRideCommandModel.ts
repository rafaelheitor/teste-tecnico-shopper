import { ApiProperty } from "@nestjs/swagger";

export class EstimateRideCommandModel {
  @ApiProperty({ type: "string" })
  customer_id: string;

  @ApiProperty({ type: "string" })
  origin: string;

  @ApiProperty({ type: "string" })
  destination: string;
}
