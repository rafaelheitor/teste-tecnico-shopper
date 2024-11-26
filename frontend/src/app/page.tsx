import EstimateRideForm from "@presentation/components/EstimateRideForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReduxProvider from "@presentation/components/ReduxProvider";

export default function Home() {
  return (
    <div>
      <ReduxProvider>
        <EstimateRideForm />
        <ToastContainer />
      </ReduxProvider>
    </div>
  );
}
