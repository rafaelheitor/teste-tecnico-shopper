import { Usecase } from "@core/common/usecase/Usecase";
import { GetDriverListPort } from "../port/usecase/GetDriverListPort";
import { DriverUsecaseDTO } from "../port/usecase/dto/DriverUsecaseDTO";

export interface GetDriverListUsecase
  extends Usecase<GetDriverListPort, Promise<DriverUsecaseDTO[]>> {}
