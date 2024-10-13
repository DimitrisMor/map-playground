import React from "react";
import { useState, useEffect, useRef } from "react";
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
import { Circle, Rectangle, Pane } from "react-leaflet";
import { SVGOverlay, LayerGroup, Tooltip, LayersControl } from "react-leaflet";
import { LatLngTuple } from "leaflet";

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

  const overlayBounds: L.LatLngBoundsLiteral = [
    [51.48, -0.1],
    [51.51, -0.05],
  ];

  const center: LatLngTuple = [51.505, -0.09];

  const outer: L.LatLngBoundsLiteral = [
    [50.505, -29.09],
    [52.505, 29.09],
  ]
  const inner: L.LatLngBoundsLiteral = [
    [49.505, -2.09],
    [53.505, 2.09],
  ]

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

  function BlinkingPane() {
    const [render, setRender] = useState(true)
    const timerRef: any = useRef()
    useEffect(() => {
      timerRef.current = setInterval(() => {
        setRender((r) => !r)
      }, 5000)
      return () => {
        clearInterval(timerRef.current)
      }
    }, [])
  
    return render ? (
      <Pane name="cyan-rectangle" style={{ zIndex: 500 }}>
        <Rectangle bounds={outer} pathOptions={{ color: 'cyan' }} />
      </Pane>
    ) : null
  }

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
      <Circle
        center={athensPosition}
        pathOptions={fillBlueOptions}
        radius={1200}
      >
        {" "}
        <Tooltip>Tooltip test</Tooltip>
      </Circle>
      {/* <SVGOverlay attributes={{ stroke: "red" }} bounds={overlayBounds}>
        <rect x="0" y="0" width="100%" height="100%" fill="blue" />
        <circle r="5" cx="10" cy="10" fill="red" />
        <text x="50%" y="50%" stroke="white">
          text
        </text>
      </SVGOverlay> */}
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
      <LayersControl position="topright">
        <LayersControl.Overlay name="Marker with popup">
          <Marker position={center}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Layer group with circles">
          <LayerGroup>
            <Circle
              center={center}
              pathOptions={{ fillColor: "blue" }}
              radius={200}
            />
            <Circle
              center={center}
              pathOptions={{ fillColor: "red" }}
              radius={100}
              stroke={false}
            />
            <LayerGroup>
              <Circle
                center={[51.51, -0.08]}
                pathOptions={{ color: "green", fillColor: "green" }}
                radius={100}
              />
            </LayerGroup>
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>

      {/* <BlinkingPane /> */}
    <Pane name="yellow-rectangle" style={{ zIndex: 499 }}>
      <Rectangle bounds={inner} pathOptions={{ color: 'yellow' }} />
      <Pane name="purple-rectangle">
        <Rectangle bounds={outer} pathOptions={{ color: 'purple' }} />
      </Pane>
    </Pane>
    </MapContainer>
  );
};

export default DrawingMap;
