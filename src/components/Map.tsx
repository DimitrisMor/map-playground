import React from "react";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
  useMapEvents,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { CRS } from "leaflet";
import { Circle } from "react-leaflet";

const customMarkerIcon = new L.Icon({
  iconUrl: process.env.PUBLIC_URL + "/map-marker.png",
  shadowUrl: markerShadow,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [1, -34],
  shadowSize: [25, 25],
});

const DrawingMap: React.FC = () => {
  const greeceCenter: [number, number] = [39.0742, 21.8243];
  const athensPosition: [number, number] = [37.9838, 23.7275];

  const fillBlueOptions = { fillColor: "blue" };

  const handleCreate = (e: any) => {
    const type = e.layerType;
    const layer = e.layer;

    if (type === "polygon" || type === "rectangle" || type === "circle") {
      const coordinates = layer.getLatLngs();
      console.log("Coordinates:", coordinates);
    }
  };

  // function LocationMarker() {
  //   const [position, setPosition] = useState(null)
  //   const map = useMapEvents({
  //     click() {
  //       map.locate()
  //     },
  //     locationfound(e:any) {
  //       setPosition(e.latlng)
  //       map.flyTo(e.latlng, map.getZoom())
  //     },
  //   })

  //   return position === null ? null : (
  //     <Marker position={position} icon={customMarkerIcon}>
  //       <Popup>You are here</Popup>
  //     </Marker>
  //   )
  // }

  return (
    <MapContainer
      center={greeceCenter}
      zoom={6}
      minZoom={4}
      maxZoom={18}
      style={{ height: "100vh", width: "100vw" }}
      // style={{
      //   width: '100%',  // 100% of the parent container's width (500px)
      //   height: '100%', // 100% of the parent container's height (300px)
      // }}
      crs={CRS.EPSG3857}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={athensPosition} icon={customMarkerIcon}>
        <Popup>Athens, Greece</Popup>
      </Marker>
      {/* <LocationMarker /> */}
      <Circle
        center={greeceCenter}
        pathOptions={fillBlueOptions}
        radius={100200}
      />

      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={handleCreate}
          draw={{
            polygon: true,
            rectangle: true,
            circle: true,
            marker: true,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};

export default DrawingMap;
