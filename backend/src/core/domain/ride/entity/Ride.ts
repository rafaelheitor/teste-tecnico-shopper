import { Entity } from "@core/common/entity/Entity";
import { IsNumber, IsString, IsDate, IsOptional } from "class-validator";

export class Ride extends Entity<number> {
  private origin:
    | {
        latitude: number;
        longitude: number;
      }
    | string;

  private destination:
    | {
        latitude: number;
        longitude: number;
      }
    | string;

  @IsString()
  @IsOptional()
  private customer_id: string;

  @IsNumber()
  private distance: number;

  @IsString()
  private duration: string;

  private options?: RideDriverOptions[];

  @IsDate()
  @IsOptional()
  private date?: Date;

  @IsNumber()
  @IsOptional()
  private value?: number;

  private driver: { id: number; name: string };

  public getOrigin() {
    return this.origin;
  }

  public getDestination() {
    return this.destination;
  }

  public getDistance() {
    return this.distance;
  }

  public getDuration() {
    return this.duration;
  }

  public getDate() {
    return this.date;
  }

  public getValue() {
    return this.value;
  }

  public getDriver() {
    return this.driver;
  }

  public getCustomerId() {
    return this.customer_id;
  }

  public getOptions() {
    return this.options;
  }

  private constructor(payload: CreateRideEntityPayload) {
    super();
    this.id = payload.id;
    this.origin = payload.origin;
    this.destination = payload.destination;
    this.distance = payload.distance;
    this.duration = payload.duration;
    this.options = payload.options;
    this.date = payload.date ? new Date(payload.date) : undefined;
    this.driver = payload.driver;
    this.value = payload.value;
    this.customer_id = payload.customer_id;
  }

  public static async fromPayload(
    payload: CreateRideEntityPayload
  ): Promise<Ride> {
    const entity = new Ride(payload);
    await entity.validate();
    return entity;
  }
}

export type CreateRideEntityPayload = {
  id?: number;
  origin:
    | {
        latitude: number;
        longitude: number;
      }
    | string;
  destination:
    | {
        latitude: number;
        longitude: number;
      }
    | string;
  distance: number;
  duration: string;
  options?: RideDriverOptions[];
  date?: Date;
  driver?: { id: number; name: string };
  value?: number;
  customer_id?: string;
};

export type RideDriverOptions = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value?: number;
};
