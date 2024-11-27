"use client";
import { useState, FormEvent } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import rideUsecases from "@infrastructure/ride/RideUsecases";
import { useAppDispatch } from "@presentation/hooks/UseDispatch";
import {
  setCustomerId,
  setDestination,
  setDestinationString,
  setDistance,
  setDuration,
  setOptions,
  setOrigin,
  setOriginString,
} from "@core/domain/ride/store/slice";
import { useAppSelector } from "@presentation/hooks/UseAppSelector";
import { useRouter } from "next/navigation";
import Footer from "./Footer";
import Header from "./Header";

const TravelRequestForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [userId, setUserId] = useState<string>("");
  const [formOrigin, setFormOrigin] = useState<string>("");
  const [formDestination, setFormDestination] = useState<string>("");
  const info = {
    origin: useAppSelector((state) => state.ride.origin),
    destination: useAppSelector((state) => state.ride.destination),
    duration: useAppSelector((state) => state.ride.duration),
  };
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await rideUsecases.estimateRideUsecase({
      origin: formOrigin,
      destination: formDestination,
      customer_id: userId,
    });

    if (response.success) {
      const { origin, destination, options, duration, distance } = response;
      dispatch(setOrigin(origin));
      dispatch(setDestination(destination));
      dispatch(setDistance(distance));
      dispatch(setDuration(duration));
      dispatch(setOptions(options));
      dispatch(setOriginString(formOrigin));
      dispatch(setDestinationString(formDestination));
      dispatch(setCustomerId(userId));
      router.push("/ride-options");
    }
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f4f4f4",
          height: "100%",
        }}
      >
        {info.origin.latitude != 0 ? null : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              maxWidth: 600,
              width: "80%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              p: 4,
              border: "1px solid #ddd",
              borderRadius: 2,
              boxShadow: 4,
              backgroundColor: "background.paper",
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              align="center"
              sx={{ color: "black" }}
            >
              Solicitação de viagem
            </Typography>

            <TextField
              label="id do usuário"
              variant="outlined"
              fullWidth
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "black",
                input: { color: "black" },
              }}
            />
            <TextField
              label="Origem"
              variant="outlined"
              fullWidth
              value={formOrigin}
              onChange={(e) => setFormOrigin(e.target.value)}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "black",
                input: { color: "black" },
              }}
            />
            <TextField
              label="Destino"
              variant="outlined"
              fullWidth
              value={formDestination}
              onChange={(e) => setFormDestination(e.target.value)}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "black",
                input: { color: "black" },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{
                backgroundColor: "#1e88e5",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Quero solicitar uma viagem
            </Button>
          </Box>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default TravelRequestForm;
