import { Driver } from "@core/domain/driver/entity/Driver";
import { Expose, plainToInstance } from "class-transformer";

export class DriverUsecaseDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  vehicle: string;

  @Expose()
  review: {
    rating: number;
    comment: string;
  };

  @Expose()
  tax: number;

  @Expose()
  minimunDistance: number;

  public static fromEntity(payload: Driver): DriverUsecaseDTO {
    return plainToInstance(DriverUsecaseDTO, payload);
  }

  public static fromEntityList(payload: Driver[]): DriverUsecaseDTO[] {
    return payload.map((item) => this.fromEntity(item));
  }
}
