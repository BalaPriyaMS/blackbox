import React from "react";
import { Vehicle } from "../../App"; // Ensure this path is correct or define Vehicle type here.

interface GraphProps {
  vehicle: Vehicle | null;
}

const Graph: React.FC<GraphProps> = ({ vehicle }) => {
  return <div>{vehicle?.type}</div>;
};

export default Graph;
