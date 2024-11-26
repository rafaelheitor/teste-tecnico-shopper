"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import DriverCard from "../../presentation/components/DriverCard";
import { useAppSelector } from "@presentation/hooks/UseAppSelector";
import ReduxProvider from "@presentation/components/ReduxProvider";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const RideOptionsScreen = () => {
  const apiKey = "";
  const driverList = useAppSelector((state) => state.ride.options);
  const origin = useAppSelector((state) => state.ride.origin);
  const destination = useAppSelector((state) => state.ride.destination);
  const duration = useAppSelector((state) => state.ride.duration);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && origin.latitude === 0) {
      router.push("/");
    }
  }, [isClient, origin.latitude, router]);

  const mapUrl =
    `https://maps.googleapis.com/maps/api/staticmap?` +
    `size=800x400&` +
    `markers=color:blue|label:A|${origin.latitude},${origin.longitude}&` +
    `markers=color:red|label:B|${destination.latitude},${destination.longitude}&` +
    `path=color:0x0000ff|weight:5|${origin.latitude},${origin.longitude}|${destination.latitude},${destination.longitude}&` +
    `key=${apiKey}`;

  if (!isClient) return null;

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 4,
        textAlign: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "black", marginLeft: "20%" }}
        >
          Sua Viagem
        </Typography>

        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "black", marginRight: "10%" }}
        >
          Motoristas disponíveis
        </Typography>
      </div>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
          flex: 1,
          overflow: "hidden",
          mt: 2,
        }}
      >
        <Box
          component="img"
          src={mapUrl}
          alt="Mapa da Viagem"
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: 2,
            boxShadow: 3,
            objectFit: "cover",
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
            overflow: "auto",
            borderRadius: 2,
            boxShadow: 3,
            p: 2,
            backgroundColor: "#fff",
            "&::-webkit-scrollbar": {
              width: 0,
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {driverList.map((driver) => (
              <DriverCard
                key={driver.id}
                driver={driver}
                duration={duration}
                onChoose={(chosenDriver) => {}}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default function Page() {
  return (
    <div>
      <ReduxProvider>
        <RideOptionsScreen />
        <ToastContainer />
      </ReduxProvider>
    </div>
  );
}
