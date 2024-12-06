import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertDrivers() {
  const drivers = [
    {
      name: "Homer Simpson",
      description:
        "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
      vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
      review: {
        rating: 2,
        comment:
          "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
      },
      tax: 2.5,
      minimun_distance: 1,
    },
    {
      name: "Dominic Toretto",
      description:
        "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
      vehicle: "Dodge Charger R/T 1970 modificado",
      review: {
        rating: 4,
        comment:
          "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
      },
      tax: 5,
      minimun_distance: 5,
    },
    {
      name: "James Bond",
      description:
        "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
      vehicle: "Aston Martin DB5 clássico",
      review: {
        rating: 5,
        comment:
          "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
      },
      tax: 10,
      minimun_distance: 10,
    },
  ];

  for (const driver of drivers) {
    const existingDriver = await prisma.driver.findFirst({
      where: { name: driver.name },
    });

    if (!existingDriver) {
      await prisma.driver.create({ data: driver });
      console.log(`Driver "${driver.name}" inserted successfully.`);
    } else {
      console.log(`Driver "${driver.name}" already exists. Skipping...`);
    }
  }
}

(async () => {
  try {
    await insertDrivers();
  } catch (error) {
    console.error("Error seeding drivers:", error);
  } finally {
    await prisma.$disconnect();
  }
})();
