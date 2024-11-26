"use client";
import { useState, FormEvent } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import AxiosHttpClient from "@/infrastructure/HttpClient/AxiosHttpClient";
import RideOptionsScreen from "@/components/RideOptionsScreen";

type LatLong = { latitude: number; longitude: number };

const TravelRequestForm: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [driverList, setDriverList] = useState<[]>([]);
  const [location, setLocation] = useState<{
    origin: LatLong;
    destination: LatLong;
  } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocation(null);

    const response = await AxiosHttpClient.request({
      url: "http://localhost:8080/ride/estimate",
      body: {
        customer_id: userId,
        origin,
        destination,
      },
      method: "post",
    });

    if (response.body?.success) {
      const { origin, destination, options } = response.body;
      setDriverList(options);
      setLocation({
        origin,
        destination,
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      {location ? (
        <RideOptionsScreen
          origin={location.origin}
          destination={location.destination}
          driverList={driverList}
        />
      ) : (
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
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
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
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
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
  );
};

export default TravelRequestForm;
