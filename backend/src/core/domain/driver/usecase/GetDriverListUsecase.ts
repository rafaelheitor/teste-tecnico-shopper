import { Usecase } from "@core/common/usecase/Usecase";
import { Driver } from "../entity/Driver";
import { GetDriverListPort } from "../port/usecase/GetDriverListPort";

export interface GetDriverListUsecase
  extends Usecase<GetDriverListPort, Promise<Driver[]>> {}
