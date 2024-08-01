import { useEffect, useState } from "react";
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

interface Vehicle {
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

interface HeaderProps {
  setVehicle: (vehicle: Vehicle | null) => void;
}

const Header = ({ setVehicle }: HeaderProps) => {
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
  const [copyText, setCopyText] = useState<string | null>(null);
  const [showVehicleType, setShowVehicleType] = useState(false);
  const url = "http://localhost:5000/vehicles";

  useEffect(() => {
    const fetchMethod = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data, "data");
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

  return (
    <div className="flex flex-col gap-4">
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
            className="w-7 h-full border border-gray-700 items-center rounded-sm"
            onClick={handleCopied}
          >
            <img src={copy} alt="copy icon" className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" onCheckedChange={setShowVehicleType} />
            <label htmlFor="airplane-mode">Type</label>
          </div>
          <DatePickerWithRange />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select graph type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Line</SelectItem>
              <SelectItem value="scatter">Scatter</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="secondary" className="hover:bg-slate-300">
            Fetch All
          </Button>
          <Button variant="secondary" className="hover:bg-slate-300">
            Clear All
          </Button>
        </div>
        <div className="flex items-center gap-6">
          <Button variant="secondary" className="hover:bg-slate-300">
            Show Map
          </Button>
          <Button variant="secondary" className="hover:bg-slate-300">
            PDF
          </Button>
          <Button variant="secondary" className="hover:bg-slate-300">
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
