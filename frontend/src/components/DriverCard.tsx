import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
  Divider,
  Button,
} from "@mui/material";

export type Driver = {
  id: number;
  description: string;
  name: string;
  review: {
    rating: number;
    comment: string;
  };
  vehicle: string;
  value: number;
};

interface DriverCardProps {
  driver: Driver;
  onChoose: (driver: Driver) => void;
}

const DriverCard: React.FC<DriverCardProps> = ({ driver, onChoose }) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        margin: "auto",
        marginBottom: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
            {driver.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6" component="div">
              {driver.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {driver.description}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body1">
            <strong>Veículo:</strong> {driver.vehicle}
          </Typography>
          <Typography variant="body1">
            <strong>Preço:</strong> R${driver.value.toFixed(2)}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="body2" color="text.secondary">
            <strong>Avaliação:</strong> "{driver.review.comment}"
          </Typography>
          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Rating
              value={driver.review.rating}
              readOnly
              precision={0.5}
              size="small"
            />
            <Typography variant="body2" color="text.secondary">
              {driver.review.rating}/5
            </Typography>
          </Box>
        </Box>

        <Box mt={2} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => onChoose(driver)}
          >
            Escolher
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DriverCard;
