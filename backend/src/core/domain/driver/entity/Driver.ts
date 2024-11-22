import { Entity } from "@core/common/entity/Entity";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class Driver extends Entity<number> {
  @IsString()
  @IsNotEmpty()
  private name: string;

  @IsString()
  @IsNotEmpty()
  private description: string;

  @IsString()
  @IsNotEmpty()
  private vehicle: string;

  private review: {
    rating: number;
    comment: string;
  };

  @IsNumber()
  private tax: number;

  @IsNumber()
  private minimunDistance: number;

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getVehicle(): string {
    return this.vehicle;
  }

  public getReview(): object {
    return this.review;
  }

  public getTax(): number {
    return this.tax;
  }

  public getMinimumDistance(): number {
    return this.minimunDistance;
  }

  private constructor(payload: CreateDriverEntityPayload) {
    super();
    this.id = payload.id;
    this.name = payload.name;
    this.description = payload.description;
    this.vehicle = payload.vehicle;
    this.review = payload.review;
    this.tax = payload.tax;
    this.minimunDistance = payload.minimunDistance;
  }

  public static async fromPayload(
    payload: CreateDriverEntityPayload
  ): Promise<Driver> {
    const entity = new Driver(payload);
    await entity.validate();
    return entity;
  }
}

export type CreateDriverEntityPayload = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  tax: number;
  minimunDistance: number;
};
