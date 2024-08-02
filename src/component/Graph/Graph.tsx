import React from "react";
import Chart from "@/components/ui/chart";
import * as echarts from "echarts";

// Define the structure of the state object
interface State {
  from: string;
  to: string;
  location: string;
  speed: number;
  fuelLevel: number;
}

interface GraphProps {
  vehicle: {
    states: State[];
  } | null;
  selectedGraph: boolean;
  dateRange: { from: Date; to: Date } | null;
}

const Graph: React.FC<GraphProps> = ({ vehicle, selectedGraph, dateRange }) => {
  if (!vehicle) return null;

  const filteredStates = vehicle.states.filter((state) => {
    const stateDateFrom = new Date(state.from);
    const stateDateTo = new Date(state.to);

    if (!dateRange) return true;
    return stateDateFrom <= dateRange.to && stateDateTo >= dateRange.from;
  });

  if (filteredStates.length === 0) {
    return (
      <div className="pt-4">No data available for the selected date range.</div>
    );
  }

  const uniqueKeys = Object.keys(filteredStates[0]).filter(
    (key) => key !== "from" && key !== "to" && key !== "location"
  );

  return (
    <div className="grid grid-cols-3 gap-4 pt-4">
      {uniqueKeys.map((key) => {
        const options: echarts.EChartsOption = {
          title: { text: key.charAt(0).toUpperCase() + key.slice(1) },
          tooltip: { trigger: "axis" },
          xAxis: {
            type: "time",
            min: dateRange ? dateRange.from.getTime() : undefined,
            max: dateRange ? dateRange.to.getTime() : undefined,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: key.charAt(0).toUpperCase() + key.slice(1),
              type: selectedGraph ? "scatter" : "line", // Use line type to plot values over time
              data: filteredStates.map((state) => ({
                name: new Date(state.from).toLocaleDateString(),
                value: [
                  new Date(state.from).getTime(),
                  state[key as keyof State],
                ],
              })),
              smooth: true,
            },
          ],
        };

        return (
          <div key={key}>
            <Chart options={options} />
          </div>
        );
      })}
    </div>
  );
};

export default Graph;
