import { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import { motion } from 'framer-motion';
import type { Observation } from '../types';

interface ObservationMapProps {
  observations: Observation[];
  userPosition: LatLngExpression | null;
  selectedId?: number | null;
  onSelect?: (observation: Observation) => void;
}

const defaultCenter: LatLngExpression = [30.5728, 104.0668];

const createIcon = (label: string, active: boolean) =>
  L.divIcon({
    className: `map-marker-icon ${active ? 'map-marker-icon--active' : ''}`,
    html: `<div class="map-marker"><span>${label}</span><div class="map-marker__pulse"></div></div>`
  });

const Recenter = ({ position }: { position: LatLngExpression | null }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 12, { duration: 1.2 });
    }
  }, [position, map]);
  return null;
};

const ObservationMap = ({ observations, userPosition, selectedId, onSelect }: ObservationMapProps) => {
  return (
    <motion.div className="observation-map__wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <MapContainer
        center={userPosition ?? defaultCenter}
        zoom={11}
        scrollWheelZoom
        className="observation-map"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Recenter position={userPosition} />
        {observations.map((observation) => {
          const label = observation.species_common_name?.slice(0, 2) ?? '花';
          return (
            <Marker
              key={observation.id}
              position={[observation.latitude, observation.longitude]}
              icon={createIcon(label, selectedId === observation.id)}
              eventHandlers={{
                click: () => onSelect?.(observation)
              }}
            >
              <Popup>
                <strong>{observation.location_name ?? observation.species_common_name ?? '观测点'}</strong>
                <br />
                {observation.note ?? '花期记录更新'}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </motion.div>
  );
};

export default ObservationMap;
