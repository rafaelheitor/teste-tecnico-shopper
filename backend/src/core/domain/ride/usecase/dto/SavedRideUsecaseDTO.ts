import { RideUsecaseDTO } from "./RideUsecaseDto";

export class SavedRideUsecaseDTO {
  public customer_id: string;

  public rides: RideUsecaseDTO[];

  private constructor(payload: RideUsecaseDTO[]) {
    (this.customer_id = payload[0].customer_id),
      (this.rides = payload.map((item) => ({
        id: item.id,
        date: item.date,
        origin: item.origin,
        destination: item.destination,
        distance: item.distance,
        duration: item.duration,
        driver: { ...item.driver },
        value: item.value,
      })));
  }

  public static new(payload: RideUsecaseDTO[]) {
    return new SavedRideUsecaseDTO(payload);
  }
}
