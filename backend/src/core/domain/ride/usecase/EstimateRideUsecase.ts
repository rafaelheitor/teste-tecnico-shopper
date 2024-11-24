import { Usecase } from "@core/common/usecase/Usecase";
import { EstimateRidePort } from "../port/usecase/EstimateRideUsecasePort";
import { RideUsecaseDTO } from "./dto/RideUsecaseDto";

export interface EstimateRideUsecase
  extends Usecase<EstimateRidePort, Promise<RideUsecaseDTO>> {}
