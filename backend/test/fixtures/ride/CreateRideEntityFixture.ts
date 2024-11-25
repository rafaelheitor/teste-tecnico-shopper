import { Ride } from "@core/domain/ride/entity/Ride";

export class CreateRideEntityFixture {
  public static newEstimateRide() {
    return Ride.fromPayload({
      origin: {
        latitude: -12.12759382680339,
        longitude: -38.41508699956368,
      },
      destination: { latitude: -12.1381339, longitude: -38.4179707 },
      distance: 2000,
      duration: "6m",
      options: [
        {
          id: 1,
          name: "Homer Simpson",
          description:
            "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas eboas risadas (e talvez alguns desvios).",
          vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
          review: {
            rating: 2,
            comment:
              "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
          },
          value: 5,
        },
      ],
    });
  }

  public static newCompletedRide() {
    return Ride.fromPayload({
      id: 1,
      origin: "Rua joão ribeiro, 100, Alagoinhas",
      destination: "Rua barão de cotegipe, centro, Alagoinhas",
      distance: 2,
      duration: "6 minutos",
      driver: { id: 1, name: "Homer Simpson" },
      value: 5,
      customer_id: "1",
      date: new Date(),
    });
  }
}
