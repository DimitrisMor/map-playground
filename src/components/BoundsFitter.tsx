import { useState, useMemo } from "react";
import { useMap } from "react-leaflet";
import { Rectangle } from "react-leaflet";
import { LatLngBoundsLiteral } from "leaflet";

const innerBounds: LatLngBoundsLiteral = [
  [49.505, -2.09],
  [53.505, 2.09],
];
const outerBounds: LatLngBoundsLiteral = [
  [50.505, -29.09],
  [52.505, 29.09],
];

const redColor = { color: "red" };
const whiteColor = { color: "white" };

function SetBoundsRectangles() {
  const [bounds, setBounds] = useState<LatLngBoundsLiteral>([
    [49.505, -2.09],
    [53.505, 2.09],
  ]);
  const map = useMap();

  const innerHandlers = useMemo(
    () => ({
      click() {
        setBounds(innerBounds);
        map.fitBounds(innerBounds);
      },
    }),
    [map]
  );
  const outerHandlers = useMemo(
    () => ({
      click() {
        setBounds(outerBounds);
        map.fitBounds(outerBounds);
      },
    }),
    [map]
  );

  return (
    <>
      <Rectangle
        bounds={outerBounds}
        eventHandlers={outerHandlers}
        pathOptions={bounds === outerBounds ? redColor : whiteColor}
      />
      <Rectangle
        bounds={innerBounds}
        eventHandlers={innerHandlers}
        pathOptions={bounds === innerBounds ? redColor : whiteColor}
      />
    </>
  );
}

export default SetBoundsRectangles;
