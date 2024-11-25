import { Usecase } from "@core/common/usecase/Usecase";
import { DriverUsecaseDTO } from "../port/usecase/dto/DriverUsecaseDTO";
import { GetDriverByIdPort } from "../port/usecase/GetDriverByIdPort";

export interface GetDriverByIdUsecase
  extends Usecase<GetDriverByIdPort, Promise<DriverUsecaseDTO>> {}
