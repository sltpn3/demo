import React, { useState } from "react";
import '../../css/bootstrap.css';

import ReactTooltip from "react-tooltip";
import MapChart from "./../../maps/MapsHome";

function HomeMaps(props) {
  const [content, setContent] = useState("");
  return (
    <div>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default HomeMaps;