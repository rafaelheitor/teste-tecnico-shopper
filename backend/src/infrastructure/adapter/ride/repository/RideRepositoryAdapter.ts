import { Ride } from "@core/domain/ride/entity/Ride";
import {
  GetRideOptions,
  RideRepositoryPort,
} from "@core/domain/ride/port/repository/RideRepositoryPort";
import { PrismaService } from "@infrastructure/adapter/ORM/PrismaService";

export class RideRepositoryAdapter implements RideRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async save(ride: Ride): Promise<Ride> {
    const saved = await this.prismaService.ride.create({
      data: {
        customer_id: ride.getCustomerId(),
        origin: ride.getOrigin() as string,
        destination: ride.getDestination() as string,
        distance: ride.getDistance(),
        driver: ride.getDriver(),
        duration: ride.getDuration(),
        value: ride.getValue(),
        date: ride.getDate(),
      },
    });

    if (saved) return ride;
  }

  async getSavedRides(options: GetRideOptions): Promise<Ride[]> {
    const where = this.createWhereObject(options);

    const foundRides = await this.prismaService.ride.findMany(where);

    if (!foundRides) return undefined;

    const mappedResult = await Promise.all(
      foundRides.map((item) =>
        this.toDomainEntity({
          ...item,
          driver: item.driver as { id: number; name: string },
        })
      )
    );

    return mappedResult;
  }

  private createWhereObject(options: GetRideOptions) {
    const where = {
      where: Object.fromEntries(
        Object.entries({
          customer_id: options.customer_id,
          ...(options.driver_id && {
            driver: {
              path: ["id"],
              equals: options.driver_id,
            },
          }),
        }).filter(([_, value]) => value !== undefined)
      ),
    };

    return where;
  }

  private toDomainEntity(payload: SavedRides) {
    return Ride.fromPayload(payload);
  }
}

export type SavedRides = {
  id: number;
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: { id: number; name: string };
  value: number;
  date: Date;
};
