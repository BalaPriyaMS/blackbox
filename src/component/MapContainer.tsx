/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";

interface State {
  from: string;
  to: string;
  location: string;
  speed: number;
  fuelLevel: number;
}

interface MapContainerProps {
  vehicle: {
    vehicleId: string;
    states: State[];
  } | null;
  onClose: () => void;
}

const MapContainer = ({ vehicle, onClose }: MapContainerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      vehicle &&
      vehicle.states.length > 0 &&
      mapRef.current &&
      (window as any).google
    ) {
      const [firstLat, firstLng] = vehicle.states[0].location
        .split(",")
        .map(Number);
      const map = new (window as any).google.maps.Map(mapRef.current, {
        zoom: 8,
        center: { lat: firstLat, lng: firstLng },
      });

      // Mark locations
      vehicle.states.forEach((state) => {
        const [lat, lng] = state.location.split(",").map(Number);
        new (window as any).google.maps.Marker({
          position: { lat, lng },
          map: map,
          title: vehicle.vehicleId,
        });
      });

      // Connect locations with a line
      const pathCoordinates = vehicle.states.map((state) => {
        const [lat, lng] = state.location.split(",").map(Number);
        return { lat, lng };
      });

      if (pathCoordinates.length > 1) {
        new (window as any).google.maps.Polyline({
          path: pathCoordinates,
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map: map,
        });
      }
    }
  }, [vehicle]);

  return (
    <div className="fixed bg-white w-[50%] h-[100%] p-4 border border-gray-700 z-10">
      <button className="mt-2" onClick={onClose}>
        Close
      </button>
      <div ref={mapRef} className="w-full h-full"></div>
    </div>
  );
};

export default MapContainer;
