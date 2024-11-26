import { AppDispatch } from "@core/common/store/types";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
