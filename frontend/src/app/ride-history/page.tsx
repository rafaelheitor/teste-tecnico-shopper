"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import Header from "@presentation/components/Header";
import Footer from "@presentation/components/Footer";
import driverUsecases from "@infrastructure/driver/DriverUsecases";
import rideUsecases from "@infrastructure/ride/RideUsecases";
import { Driver } from "@core/domain/driver/entity/DriverPayload";
import { SavedRide } from "@core/domain/ride/entity/RidePayload";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RidePage: React.FC = () => {
  const [rides, setRides] = useState<SavedRide[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [selectedDriverId, setSelectedDriverId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await driverUsecases.getDriverList();
        setDrivers(response);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  const applyFilter = async () => {
    setLoading(true);
    try {
      const options = {
        customer_id: userId,
        driver_id: selectedDriverId || undefined,
      };

      const filteredRides = await rideUsecases.getRideHistoryUsecase(options);
      setRides(filteredRides.rides);
    } catch (error) {
      setRides([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <Header />
      <Container
        maxWidth="md"
        sx={{ backgroundColor: "#ffffff", color: "#0000ff", py: 4 }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Histórico de Viagens
        </Typography>

        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          mb={4}
          sx={{ backgroundColor: "#f0f8ff", p: 2, borderRadius: 1 }}
        >
          <TextField
            label="ID do Usuário"
            variant="outlined"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            fullWidth
          />
          <Select
            value={selectedDriverId}
            onChange={(e) => setSelectedDriverId(Number(e.target.value))}
            displayEmpty
            fullWidth
          >
            <MenuItem value={0}>Todos os Motoristas</MenuItem>
            {drivers.map((driver) => (
              <MenuItem key={driver.id} value={driver.id}>
                {driver.name}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            color="primary"
            onClick={applyFilter}
            disabled={loading}
            sx={{ alignSelf: "flex-start" }}
          >
            {loading ? "Carregando..." : "Aplicar Filtro"}
          </Button>
        </Box>

        {rides != undefined && rides.length > 0 ? (
          rides.map((ride) => (
            <Card
              key={ride.id}
              sx={{
                mb: 3,
                borderColor: "#0000ff",
                borderWidth: 1,
                borderStyle: "solid",
              }}
            >
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" color="primary">
                      Viagem #{ride.id}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <strong>Data e hora:</strong>{" "}
                      {new Date(ride.date).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <strong>Origem:</strong> {ride.origin}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <strong>Destino:</strong> {ride.destination}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Distância:</strong>{" "}
                      {(ride.distance / 1000).toFixed(2)} km
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Tempo:</strong> {ride.duration}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Motorista:</strong> {ride.driver.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Valor:</strong> R${ride.value.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography align="center" color="error">
            Nenhuma viagem encontrada.
          </Typography>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default RidePage;
