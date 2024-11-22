import {
  CreateDriverEntityPayload,
  Driver,
} from "@core/domain/driver/entity/Driver";

describe("Driver entity", () => {
  test("Should create a driver entity with the required parameters", async () => {
    const payload: CreateDriverEntityPayload = {
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
      tax: 2.5,
      minimunDistance: 1,
    };

    const entity = await Driver.fromPayload(payload);

    expect(entity.getName()).toEqual(payload.name);
    expect(entity.getDescription()).toEqual(payload.description);
    expect(entity.getVehicle()).toEqual(payload.vehicle);
    expect(entity.getReview()).toEqual(payload.review);
    expect(entity.getTax()).toEqual(payload.tax);
    expect(entity.getMinimumDistance()).toEqual(payload.minimunDistance);
  });
});
