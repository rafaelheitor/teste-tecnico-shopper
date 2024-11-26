/* eslint-disable react/no-unescaped-entities */
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
  Stack,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { Driver } from "@core/domain/driver/entity/DriverPayload";

interface DriverCardProps {
  driver: Driver;
  duration: string;
  onChoose: (driver: Driver) => void;
}

const DriverCard: React.FC<DriverCardProps> = ({
  driver,
  onChoose,
  duration,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 260,
        margin: "auto",
        marginBottom: 2,
        boxShadow: 4,
        borderRadius: 3,
        padding: 2,
        backgroundColor: "background.paper",
        height: "50%",
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" flexDirection="column" gap={2}>
          <Avatar sx={{ bgcolor: "primary.main", width: 64, height: 64 }}>
            {driver.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6" component="div" fontWeight="bold">
              {driver.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {driver.description}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Stack direction="column" spacing={2} justifyContent="space-around">
          <Box
            display="flex"
            alignItems="center"
            flexDirection={"column"}
            flexWrap={"wrap"}
            gap={1}
          >
            <DirectionsCarIcon color="action" />
            <Typography variant="body1">
              <strong>{driver.vehicle}</strong>
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body1" fontWeight="bold">
              R${driver.value.toFixed(2)}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2">
              <strong>Duração:</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {duration}
            </Typography>
          </Box>
        </Stack>

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

        <Box mt={3} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
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
