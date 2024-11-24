import { Driver } from "@core/domain/driver/entity/Driver";
import { DriverRepositoryPort } from "@core/domain/driver/port/repository/DriverRepositoryPort";
import { PrismaService } from "@infrastructure/adapter/ORM/PrismaService";

export class DriverRepositoryAdapter implements DriverRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async getDriverByMinimunDistance(distance: number): Promise<Driver[]> {
    const result = await this.prismaService.driver.findMany({
      where: {
        minimun_distance: {
          lte: distance / 1000,
        },
      },
      orderBy: { minimun_distance: "asc" },
    });

    const mappedResult = await Promise.all(
      result.map((item) => this.toDomainModel(item))
    );

    return mappedResult;
  }

  private toDomainModel(payload: SavedDriver) {
    return Driver.fromPayload({
      id: payload.id,
      name: payload.name,
      description: payload.description,
      vehicle: payload.vehicle,
      review: payload.review,
      minimunDistance: payload.minimun_distance,
      tax: payload.tax,
    });
  }
}

export type SavedDriver = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: any;
  tax: number;
  minimun_distance: number;
};
