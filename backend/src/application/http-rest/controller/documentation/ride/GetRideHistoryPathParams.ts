import { ApiProperty } from "@nestjs/swagger";

export class GetRideHistoryPathParams {
  @ApiProperty({
    type: "string",
  })
  customer_id: string;
}
