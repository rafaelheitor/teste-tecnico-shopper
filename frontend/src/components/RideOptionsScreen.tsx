import React from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
import DriverCard, { Driver } from "./DriverCard";

type LatLong = { latitude: number; longitude: number };

interface RideOptionsScreenProps {
  origin: LatLong;
  destination: LatLong;
  driverList: Driver[];
}

const RideOptionsScreen: React.FC<RideOptionsScreenProps> = ({
  origin,
  destination,
  driverList,
}) => {
  const apiKey = "";

  const mapUrl =
    `https://maps.googleapis.com/maps/api/staticmap?` +
    `size=600x400&` +
    `markers=color:blue|label:A|${origin.latitude},${origin.longitude}&` +
    `markers=color:red|label:B|${destination.latitude},${destination.longitude}&` +
    `path=color:0x0000ff|weight:5|${origin.latitude},${origin.longitude}|${destination.latitude},${destination.longitude}&` +
    `key=${apiKey}`;

  return (
    <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom sx={{ color: "black" }}>
        Sua Viagem
      </Typography>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12}>
          <Box
            component="img"
            src={mapUrl}
            alt="Opções de viagens"
            sx={{
              width: "100%",
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {driverList.map((driver) => (
              <Grid item xs={12} sm={6} md={4} key={driver.id}>
                <DriverCard driver={driver} onChoose={(chosenDriver) => {}} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RideOptionsScreen;
