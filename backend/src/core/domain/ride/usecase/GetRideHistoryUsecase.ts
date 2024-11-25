import { Usecase } from "@core/common/usecase/Usecase";
import { GetRideHistoryPort } from "../port/usecase/GetRideHistoryPort";
import { SavedRideUsecaseDTO } from "./dto/SavedRideUsecaseDTO";

export interface GetRideHistoryUsecase
  extends Usecase<GetRideHistoryPort, Promise<SavedRideUsecaseDTO>> {}
