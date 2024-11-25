import { ApiProperty } from "@nestjs/swagger";

class Driver {
  @ApiProperty({ type: "number" })
  id: number;

  @ApiProperty({ type: "string" })
  name: string;
}

export class SaveRideCommandModel {
  @ApiProperty({ type: "string" })
  customer_id: string;

  @ApiProperty({ type: "string" })
  origin: string;

  @ApiProperty({ type: "string" })
  destination: string;

  @ApiProperty({ type: "number" })
  distance: number;

  @ApiProperty({ type: "string" })
  duration: string;

  @ApiProperty({ type: Driver })
  driver: { id: number; name: string };

  @ApiProperty({ type: "number" })
  value: number;
}
