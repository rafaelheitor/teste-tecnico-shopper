import { CoreApiResponse } from "@core/common/api/CoreApiResponse";

describe("CoreApiResponse - Success Cases", () => {
  test("should return a success response with default success message", () => {
    const response = CoreApiResponse.success();

    expect(response.code).toBe(200);
    expect(response.message).toBe("Operação realizada com sucesso");
    expect(response.success).toBe(true);
  });

  test("should return a success response with custom data", () => {
    const data = { key: "value" };
    const response = CoreApiResponse.success(data);

    expect(response.code).toBe(200);
    expect(response.message).toBe("Operação realizada com sucesso");
    expect(response.success).toBe(true);
    expect(response["key"]).toEqual(data.key);
  });

  test("should return a success response when data is undefined", () => {
    const response = CoreApiResponse.success(undefined);

    expect(response.code).toBe(200);
    expect(response.message).toBe("Operação realizada com sucesso");
    expect(response.success).toBe(true);
  });
});
