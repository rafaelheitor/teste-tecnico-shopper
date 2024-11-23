import { Expose, plainToInstance } from "class-transformer";
import { RideDriverOptions, Ride } from "../../entity/Ride";

export class RideUsecaseDTO {
  @Expose()
  id?: number;

  @Expose()
  origin: {
    latitude: number;
    longitude: number;
  };

  @Expose()
  destination: {
    latitude: number;
    longitude: number;
  };

  @Expose()
  distance: number;

  @Expose()
  duration: string;

  @Expose()
  date?: Date;

  @Expose()
  driver?: { id: number; name: string };

  @Expose()
  value: number;

  @Expose()
  options: RideDriverOptions[];

  public static fromEntity(payload: Ride) {
    const dto = plainToInstance(RideUsecaseDTO, payload);

    for (const [key, value] of Object.entries(dto)) {
      if (value == undefined) delete dto[key];
    }

    return dto;
  }
}
