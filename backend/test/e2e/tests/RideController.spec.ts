import { RideDITokens } from "@core/domain/ride/di/RideDITokens";
import { EstimateRidePort } from "@core/domain/ride/port/usecase/EstimateRideUsecasePort";
import { RideUsecaseDTO } from "@core/domain/ride/usecase/dto/RideUsecaseDto";
import { EstimateRideUsecase } from "@core/domain/ride/usecase/EstimateRideUsecase";
import { TestServer } from "@test/e2e/common/TestServer";
import { CreateRideEntityFixture } from "@test/fixtures/ride/CreateRideEntityFixture";
import * as supertest from "supertest";

describe("RideController", () => {
  let testServer: TestServer;
  let estimateRideUsecase: EstimateRideUsecase;

  beforeAll(async () => {
    testServer = await TestServer.new();

    estimateRideUsecase = testServer.testingModule.get<EstimateRideUsecase>(
      RideDITokens.EstimateRideUsecase
    );
    await testServer.serverApplication.init();
  });

  describe("Estimate ride test cases", () => {
    test("Should estimate ride accuratly and return info about it", async () => {
      const body: EstimateRidePort = {
        customer_id: "1",
        origin: "Rua João Ribeiro, 100, kennedy, Alagoinhas",
        destination: "Rua Elvira Dorea, centro, Alagoinhas",
      };
      const mockUsecaseDTO = RideUsecaseDTO.fromEntity(
        await CreateRideEntityFixture.newEstimateRide()
      );

      const estimateUsecase = jest
        .spyOn(estimateRideUsecase, "execute")
        .mockResolvedValue(mockUsecaseDTO);
      const response = await supertest(
        testServer.serverApplication.getHttpServer()
      )
        .post(`/ride/estimate`)
        .send(body);

      expect(response.body).toStrictEqual({
        ...mockUsecaseDTO,
        code: 200,
        message: "Operação realizada com sucesso",
        success: true,
      });

      expect(response.statusCode).toBe(200);
      expect(estimateUsecase).toHaveBeenCalled();
    });
    test("Should return error if customer_id was not defined", async () => {
      const body: EstimateRidePort = {
        customer_id: "",
        origin: "Rua João Ribeiro, 100, kennedy, Alagoinhas",
        destination: "Rua Elvira Dorea, centro, Alagoinhas",
      };

      const response = await supertest(
        testServer.serverApplication.getHttpServer()
      )
        .post(`/ride/estimate`)
        .send(body);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error_code: "INVALID_DATA",
        error_description:
          "Os dados fornecidos no corpo da requisição são inválidos",
      });
    });
    test("Should return error if origin was not defined", async () => {
      const body: EstimateRidePort = {
        customer_id: "1",
        origin: "",
        destination: "Rua Elvira Dorea, centro, Alagoinhas",
      };

      const response = await supertest(
        testServer.serverApplication.getHttpServer()
      )
        .post(`/ride/estimate`)
        .send(body);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error_code: "INVALID_DATA",
        error_description:
          "Os dados fornecidos no corpo da requisição são inválidos",
      });
    });
    test("Should return error if destination was not defined", async () => {
      const body: EstimateRidePort = {
        customer_id: "1",
        origin: "Rua João Ribeiro, 100, kennedy, Alagoinhas",
        destination: "",
      };

      const response = await supertest(
        testServer.serverApplication.getHttpServer()
      )
        .post(`/ride/estimate`)
        .send(body);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error_code: "INVALID_DATA",
        error_description:
          "Os dados fornecidos no corpo da requisição são inválidos",
      });
    });
    test("Should return error if origin and destination is equal", async () => {
      const body: EstimateRidePort = {
        customer_id: "1",
        origin: "Rua João Ribeiro, 100, kennedy, Alagoinhas",
        destination: "Rua João Ribeiro, 100, kennedy, Alagoinhas",
      };

      const response = await supertest(
        testServer.serverApplication.getHttpServer()
      )
        .post(`/ride/estimate`)
        .send(body);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error_code: "INVALID_DATA",
        error_description:
          "Os dados fornecidos no corpo da requisição são inválidos",
      });
    });
  });
});
