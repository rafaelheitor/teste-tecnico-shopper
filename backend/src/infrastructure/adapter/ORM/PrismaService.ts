import { PrismaClient } from "@prisma/client";

export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: "postgres://postgres:123@teste_shopper_db:5432/teste-shopper",
        },
      },
    });
  }
}
