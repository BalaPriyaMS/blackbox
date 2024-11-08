import { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import icon from "../../assets/logo-bb.png";
import copy from "../../assets/copy.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";
import { cn } from "@/lib/utils";
import MapContainer from "../MapContainer";

interface Vehicle {
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

interface HeaderProps {
  setVehicle: (vehicle: Vehicle | null) => void;
  setFetchGraph: (fetch: boolean) => void;
  setSelectedGraph: (selectgraph: boolean) => void;
  setDateRange: (dateRange: { from: Date; to: Date }) => void;
  setMode: (mode: boolean) => void;
  mode: boolean;
  vehicle: Vehicle | null;
}

const Header = ({
  setVehicle,
  setFetchGraph,
  setSelectedGraph,
  setDateRange,
  setMode,
  mode,
  vehicle,
}: HeaderProps) => {
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
  const [copyText, setCopyText] = useState<string | null>(null);
  const [showVehicleType, setShowVehicleType] = useState(false);
  const url = "http://localhost:5000/vehicles";
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const fetchMethod = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setVehicleList(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchMethod();
  }, []);

  const handleCopied = () => {
    if (copyText) {
      navigator.clipboard.writeText(copyText);
    }
  };

  const downloadAsPDF = () => {
    const element = document.body;

    const options = {
      margin: 0.5,
      filename: "blackBox.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "in",
        format: [20, 15],
        orientation: "landscape",
        compressPdf: true,
      },
    };

    html2pdf().from(element).set(options).save();
  };

  const convertToCSV = (data: Vehicle[]) => {
    const header = [
      "Vehicle ID",
      "Type",
      "From",
      "To",
      "Speed",
      "Fuel Level",
      "CellType",
      "MCC",
      "MNC",
      "TAC",
      "CELLID",
      "PCI",
    ];

    const rows = data.flatMap((vehicle) =>
      vehicle.states.map((state) => {
        return [
          vehicle.vehicleId,
          vehicle.type,
          state.from,
          state.to,
          state.speed,
          state.fuelLevel,
          state.CellType,
          state.MCC,
          state.MNC,
          state.TAC,
          state.CELLID,
          state.PCI,
        ];
      })
    );

    const csvContent = [header, ...rows].map((e) => e.join(",")).join("\n");
    return csvContent;
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(vehicleList);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "vehicle_data.csv");
  };

  return (
    <div
      className={cn("flex flex-col gap-4", mode ? "bg-[#1e1b4b]" : "bg-white")}
    >
      <img src={icon} alt="bb icon" className="w-24 h-11" />
      <div className="flex gap-4 w-full h-16 border-2 border-gray-700 p-3 items-center justify-between">
        <div className="flex gap-6 items-center ">
          <Select
            onValueChange={(value) => {
              const selectedVehicle = vehicleList.find(
                (vehicle) => vehicle.vehicleId === value
              );
              if (selectedVehicle) {
                setCopyText(selectedVehicle.vehicleId);
                setVehicle(selectedVehicle);
                setFetchGraph(false);
              }
            }}
          >
            <SelectTrigger className="w-[180px] ">
              <SelectValue placeholder="select Vehicle" />
            </SelectTrigger>
            <SelectContent>
              {vehicleList.map((item) => (
                <SelectItem key={item.vehicleId} value={item.vehicleId}>
                  {showVehicleType ? item.type : item.vehicleId}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button
            className={cn(
              "w-7 h-full border border-gray-700 items-center rounded-sm ",
              mode ? "bg-white" : ""
            )}
            onClick={handleCopied}
          >
            <img src={copy} alt="copy icon" className="w-6 h-6" />
          </button>
          <div
            className={cn(
              "flex items-center space-x-2",
              mode ? "text-white" : "text-black"
            )}
          >
            <Switch onCheckedChange={setShowVehicleType} />
            <label>Device Type</label>
          </div>
          <DatePickerWithRange onChange={setDateRange} />
          <Select
            onValueChange={(value) => {
              if (value === "scatter") setSelectedGraph(true);
              else {
                setSelectedGraph(false);
              }
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select graph type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Line</SelectItem>
              <SelectItem value="scatter">Scatter</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="secondary"
            className="hover:bg-slate-300"
            onClick={() => {
              setFetchGraph(true);
            }}
          >
            Fetch All
          </Button>
          <Button
            variant="secondary"
            className="hover:bg-slate-300"
            onClick={() => {
              setFetchGraph(false);
              setVehicle(null);
            }}
          >
            Clear Graph
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            className="hover:bg-slate-300"
            onClick={() => {
              setShowMap(true);
            }}
          >
            Show Map
          </Button>
          <Button
            variant="secondary"
            className="hover:bg-slate-300"
            onClick={downloadAsPDF}
          >
            Download as PDF
          </Button>
          <Button
            variant="secondary"
            className="hover:bg-slate-300"
            onClick={downloadCSV}
          >
            Download CSV
          </Button>
          <Switch onCheckedChange={setMode} />
          <label className={mode ? "text-white" : "text-black"}>
            Dark Mode
          </label>
        </div>
      </div>
      {showMap && vehicle && (
        <MapContainer vehicle={vehicle} onClose={() => setShowMap(false)} />
      )}
    </div>
  );
};

export default Header;
