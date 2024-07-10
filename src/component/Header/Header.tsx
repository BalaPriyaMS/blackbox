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

interface Vehicle {
  vehicleId: string;
  type: string;
  states: unknown[];
  id: string;
}

const Header = () => {
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
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

  return (
    <div className="flex flex-col gap-4">
      <img src={icon} alt="bb icon" className="w-24 h-11" />
      <div className="flex gap-4 w-full h-16 border-2 border-gray-700 p-3 items-center">
        <Select>
          <SelectTrigger className="w-[180px] ">
            <SelectValue placeholder="select Vehicle" />
          </SelectTrigger>
          <SelectContent>
            {vehicleList.map((item) => (
              <SelectItem key={item.vehicleId} value={item.vehicleId}>
                {item.vehicleId}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <button className="w-7 h-full border border-gray-700 items-center rounded-sm">
          <img src={copy} alt="copy icon" className="w-6 h-6" />
        </button>
        <h1>toggle btn</h1>
        <h1>date picker </h1>
        <h1>graph type</h1>
      </div>
    </div>
  );
};

export default Header;
