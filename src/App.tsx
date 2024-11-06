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
    CellType: number;
    MCC: number;
    MNC: number;
    TAC: number;
    CELLID: number;
    PCI: number;
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
  const [mode, setMode] = useState(false);
  return (
    <div className="grid grid-rows-[150px_auto] ">
      <Header
        setVehicle={setVehicle}
        setFetchGraph={setFetchGraph}
        setSelectedGraph={setSelectedGraph}
        setDateRange={setDateRange}
        setMode={setMode}
        mode={mode}
        vehicle={vehicle}
      />

      {fetchGraph && (
        <Graph
          vehicle={vehicle}
          selectedGraph={selectedGraph}
          dateRange={dateRange}
          mode={mode}
        />
      )}
    </div>
  );
}

export default App;
