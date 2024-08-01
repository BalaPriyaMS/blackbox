import { useState } from "react";
import "./App.css";
import Header from "./component/Header/Header";
import Graph from "./component/Graph/Graph";

export interface Vehicle {
  vehicleId: string;
  type: string;
  states: {
    timestamp: string;
    location: string;
    speed: number;
    fuelLevel: number;
  }[];
  id: string;
}

function App() {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  return (
    <div className="m-">
      <Header setVehicle={setVehicle} />
      <Graph vehicle={vehicle} />
    </div>
  );
}

export default App;
