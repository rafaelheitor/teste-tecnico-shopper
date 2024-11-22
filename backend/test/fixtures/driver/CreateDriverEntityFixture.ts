import { Driver } from "@core/domain/driver/entity/Driver";

export class CreateDriverEntityFixture {
  public static new() {
    return Driver.fromPayload({
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
    });
  }
}
