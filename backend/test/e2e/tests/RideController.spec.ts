import { Code } from "@core/common/code/Code";
import { DriverDITokens } from "@core/domain/driver/di/DriverDITokens";
import { DriverRepositoryPort } from "@core/domain/driver/port/repository/DriverRepositoryPort";
import { RideDITokens } from "@core/domain/ride/di/RideDITokens";
import { EstimateRidePort } from "@core/domain/ride/port/usecase/EstimateRideUsecasePort";
import { SaveRidePort } from "@core/domain/ride/port/usecase/SaveRidePort";
import { RideUsecaseDTO } from "@core/domain/ride/usecase/dto/RideUsecaseDto";
import { EstimateRideUsecase } from "@core/domain/ride/usecase/EstimateRideUsecase";
import { SaveRideUsecase } from "@core/domain/ride/usecase/SaveRideUsecase";
import { TestServer } from "@test/e2e/common/TestServer";
import { CreateDriverEntityFixture } from "@test/fixtures/driver/CreateDriverEntityFixture";
import { CreateRideEntityFixture } from "@test/fixtures/ride/CreateRideEntityFixture";
import * as supertest from "supertest";

describe("RideController", () => {
  let testServer: TestServer;
  let estimateRideUsecase: EstimateRideUsecase;
  let saveRideUsecase: SaveRideUsecase;
  let driverRepository: DriverRepositoryPort;

  beforeAll(async () => {
    testServer = await TestServer.new();

    estimateRideUsecase = testServer.testingModule.get<EstimateRideUsecase>(
      RideDITokens.EstimateRideUsecase
    );

    saveRideUsecase = testServer.testingModule.get<SaveRideUsecase>(
      RideDITokens.SaveRideUsecase
    );

    driverRepository = testServer.testingModule.get<DriverRepositoryPort>(
      DriverDITokens.DriverRepositoryPort
    );

    await testServer.serverApplication.init();
  });

  beforeEach(() => {
    jest.resetAllMocks();
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

  describe("SaveRideUsecase tests", () => {
    test("Should return error if origin and destination is equal", async () => {
      const body: SaveRidePort = {
        customer_id: "1",
        origin: "Rua João Ribeiro, 100, kennedy, Alagoinhas",
        destination: "Rua João Ribeiro, 100, kennedy, Alagoinhas",
        distance: 2127,
        driver: { id: 1, name: "Homer Simpson" },
        duration: "6 minutos",
        value: 5.71,
      };

      const response = await supertest(
        testServer.serverApplication.getHttpServer()
      )
        .patch(`/ride/confirm`)
        .send(body);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error_code: "INVALID_DATA",
        error_description:
          "Os dados fornecidos no corpo da requisição são inválidos",
      });
    });

    test("Should return error if customer_id is empty", async () => {
      const body: SaveRidePort = {
        customer_id: "",
        origin: "Rua João Ribeiro, 100, kennedy, Alagoinhas",
        destination: "Rua Elvira Dorea, centro, Alagoinhas",
        distance: 2127,
        driver: { id: 1, name: "Homer Simpson" },
        duration: "6 minutos",
        value: 5.71,
      };

      const response = await supertest(
        testServer.serverApplication.getHttpServer()
      )
        .patch(`/ride/confirm`)
        .send(body);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error_code: "INVALID_DATA",
        error_description:
          "Os dados fornecidos no corpo da requisição são inválidos",
      });
    });
    test("Should return error if driver was not found", async () => {
      const body: SaveRidePort = {
        customer_id: "1",
        origin: "Rua João Ribeiro, 100, kennedy, Alagoinhas",
        destination: "Rua Elvira Dorea, centro, Alagoinhas",
        distance: 2127,
        driver: { id: 1, name: "Homer Simpson" },
        duration: "6 minutos",
        value: 5.71,
      };

      jest.spyOn(driverRepository, "getById").mockResolvedValue(undefined);

      const response = await supertest(
        testServer.serverApplication.getHttpServer()
      )
        .patch(`/ride/confirm`)
        .send(body);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        error_code: Code.DRIVER_NOT_FOUND.error_code,
        error_description: Code.DRIVER_NOT_FOUND.message,
      });
    });
    test("Should return error if distance is less than minimun distance accepted", async () => {
      const body: SaveRidePort = {
        customer_id: "1",
        origin: "Rua João Ribeiro, 100, kennedy, Alagoinhas",
        destination: "Rua Elvira Dorea, centro, Alagoinhas",
        distance: 800,
        driver: { id: 1, name: "Homer Simpson" },
        duration: "6 minutos",
        value: 5.71,
      };

      const mockDriver = await CreateDriverEntityFixture.new();

      jest.spyOn(driverRepository, "getById").mockResolvedValue(mockDriver);

      const response = await supertest(
        testServer.serverApplication.getHttpServer()
      )
        .patch(`/ride/confirm`)
        .send(body);

      expect(response.statusCode).toBe(406);
      expect(response.body).toEqual({
        error_code: Code.INVALID_DISTANCE.error_code,
        error_description: Code.INVALID_DISTANCE.message,
      });
    });
  });
  test("Should save ride on the persistence mechanism", async () => {
    const body: SaveRidePort = {
      customer_id: "1",
      origin: "Rua João Ribeiro, 100, kennedy, Alagoinhas",
      destination: "Rua Elvira Dorea, centro, Alagoinhas",
      distance: 2127,
      driver: { id: 1, name: "Homer Simpson" },
      duration: "6 minutos",
      value: 5.71,
    };
    const mockDto = RideUsecaseDTO.fromEntity(
      await CreateRideEntityFixture.newCompletedRide()
    );
    jest.spyOn(saveRideUsecase, "execute").mockResolvedValue(mockDto);
    const response = await supertest(
      testServer.serverApplication.getHttpServer()
    )
      .patch("/ride/confirm")
      .send(body);
    expect(response.body).toStrictEqual({
      code: 200,
      success: true,
      message: "Operação realizada com sucesso",
    });
  });
});