import { useState } from "react";
import "./App.css";
import Header from "./component/Header/Header";
import Graph from "./component/Graph/Graph";

export interface Vehicle {
  vehicleId: string;
  type: string;
  states: {
    from: string;
    to: string;
    location: string;
    speed: number;
    fuelLevel: number;
  }[];
  id: string;
}

function App() {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [fetchGraph, setFetchGraph] = useState(false);
  const [selectedGraph, setSelectedGraph] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | null>(
    null
  );
  return (
    <div className="">
      <Header
        setVehicle={setVehicle}
        setFetchGraph={setFetchGraph}
        setSelectedGraph={setSelectedGraph}
        setDateRange={setDateRange}
      />
      {fetchGraph && (
        <Graph
          vehicle={vehicle}
          selectedGraph={selectedGraph}
          dateRange={dateRange}
        />
      )}
    </div>
  );
}

export default App;
