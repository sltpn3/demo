import React, { memo } from "react";
import { ZoomableGroup, ComposableMap, Geographies, Geography } from "react-simple-maps";
// import geoUrl from "./indonesia-topojson-city-regency.json";
// import geoUrl from "./Indonesia-Level-Kota-dan-Kabupaten_2.json";

// const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
const geoUrl = process.env.PUBLIC_URL + "./geo/Indonesia-Level-Kota-dan-Kabupaten2.json";

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const starting_position = [118, -1]
const height = 400

const MapChart = ({ setTooltipContent }) => {
  return (
    <div>
      <div className="container">
        <ComposableMap data-tip="" projectionConfig={{ scale: 950 }} projection="geoMercator" height={height}>
          <ZoomableGroup center={starting_position}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const { PROV, KABKOT, PROVNO, KABKOTNO } = geo.properties;
                      setTooltipContent(`${PROVNO}.${KABKOTNO} - ${KABKOT} - ${PROV}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        fill: "#D6D6DA",
                        outline: "#000000",
                        stroke: "none"
                      },
                      hover: {
                        fill: "#F53",
                        outline: "none"
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none"
                      }
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
};

export default memo(MapChart);
