import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { fetchCoordinates } from "../../../api/fetchLocationCoordinates";
import { useOnScreen } from "../../../hooks/useOnScreen";

const defaultIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapProps {
  city: string;
  state: string;
}

const Map = ({ city, state }: MapProps): JSX.Element => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [hasFetched, setHasFetched] = useState(false);
  const [mapRef, isVisible] = useOnScreen();

  useEffect(() => {
    if (isVisible && !hasFetched) {
      setHasFetched(true);
      fetchCoordinates({ city, state }).then((response) => {
        if (response) {
          setCoords({ lat: response.lat, lon: response.lon });
        }
      });
    }
  }, [isVisible, hasFetched]);

  return (
    <div ref={mapRef} style={{ height: "300px", width: "100%" }}>
      {coords ? (
        <MapContainer
          center={[coords.lat, coords.lon]}
          zoom={12}
          style={{ height: "100%", width: "100%", zIndex: 1 }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[coords.lat, coords.lon]} icon={defaultIcon}>
            <Popup>
              {city}, {state}
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default Map;
