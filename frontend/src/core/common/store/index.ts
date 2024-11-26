import { rideSlice } from "@core/domain/ride/store/slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    ride: rideSlice.reducer,
  },
});
