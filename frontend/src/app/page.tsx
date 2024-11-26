import Image from "next/image";
import styles from "./page.module.css";
import EstimateRideForm from "@/components/EstimateRideForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RideOptionsScreen from "@/components/RideOptionsScreen";

const origin = {
  latitude: -12.1276184,
  longitude: -38.4153415,
};

const destination = {
  latitude: -12.1381952,
  longitude: -38.4181099,
};

export default function Home() {
  return (
    <div>
      <EstimateRideForm />

      <ToastContainer />
    </div>
  );
}
