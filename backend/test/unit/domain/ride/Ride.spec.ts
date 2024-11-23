import { CreateRideEntityPayload, Ride } from "@core/domain/ride/entity/Ride";

describe("Ride entity", () => {
  test("Should create a valid instance of the Ride entity", async () => {
    const payload: CreateRideEntityPayload = {
      id: 1,
      origin: {
        latitude: -12.12759382680339,
        longitude: -38.41508699956368,
      },
      destination: {
        latitude: -12.126549,
        longitude: -38.42007,
      },
      distance: 2,
      duration: "6 minutos",
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
        },
      ],
    };

    const entity = await Ride.fromPayload(payload);

    entity.calulateCost(2.5);

    expect(entity.getOrigin()).toEqual(payload.origin);
    expect(entity.getDestination()).toEqual(payload.destination);
    expect(entity.getDistance()).toEqual(payload.distance);
    expect(entity.getDuration()).toEqual(payload.duration);
    expect(entity.getOptions()[0].value).toBe(5);
  });
});
