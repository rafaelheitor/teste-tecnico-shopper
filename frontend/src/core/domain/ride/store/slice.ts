import { Driver } from "@core/domain/driver/entity/DriverPayload";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ride } from "../entity/RidePayload";

const initialState: Ride = {
  origin: { latitude: 0, longitude: 0 },
  destination: { latitude: 0, longitude: 0 },
  distance: "",
  duration: "",
  options: [],
};

export const rideSlice = createSlice({
  name: "Ride",
  initialState,
  reducers: {
    setOrigin(
      state,
      action: PayloadAction<{ latitude: number; longitude: number }>
    ) {
      state.origin = action.payload;
    },

    setDestination(
      state,
      action: PayloadAction<{ latitude: number; longitude: number }>
    ) {
      state.destination = action.payload;
    },

    setDistance(state, action: PayloadAction<string>) {
      state.distance = action.payload;
    },

    setDuration(state, action: PayloadAction<string>) {
      state.duration = action.payload;
    },

    setOptions(state, action: PayloadAction<Driver[]>) {
      action.payload.forEach((item) => state.options.push(item));
    },
  },
});

export const {
  setOrigin,
  setDestination,
  setDistance,
  setDuration,
  setOptions,
} = rideSlice.actions;
