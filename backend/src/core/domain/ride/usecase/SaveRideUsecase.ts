import { Usecase } from "@core/common/usecase/Usecase";
import { SaveRidePort } from "../port/usecase/SaveRidePort";
import { RideUsecaseDTO } from "./dto/RideUsecaseDto";

export interface SaveRideUsecase
  extends Usecase<SaveRidePort, Promise<RideUsecaseDTO>> {}
