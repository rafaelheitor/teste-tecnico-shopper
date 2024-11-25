import { Ride } from "@core/domain/ride/entity/Ride";
import { RideRepositoryPort } from "@core/domain/ride/port/repository/RideRepositoryPort";
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
}
