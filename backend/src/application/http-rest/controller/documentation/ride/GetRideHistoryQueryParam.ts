import { ApiProperty } from "@nestjs/swagger";

export class GetRideHistoryQueryParams {
  @ApiProperty({
    type: "string",
    required: false,
  })
  driver_id?: string;
}
