import React, { useState } from "react";
import "./App.css";
import MapRenderer from "./map/MapRenderer";
import MapOptions from "./map/MapOptions";
import { Container } from "@mui/material";
import { MapParams, getDefaultParams } from "./api/map";
import MapColorRanges from "./map/MapColorRanges";
import { ColorRange } from "./lib/types";

function App() {
  const [params, setParams] = useState<MapParams>(getDefaultParams());
  return (
    <Container>
      <MapOptions
        onSubmit={(newParams) => setParams(newParams)}
        params={params}
      />
      <MapRenderer params={params} />
      <MapColorRanges
        heightColors={params.ranges}
        onSave={(heights: Array<ColorRange>) => {
          setParams({ ...params, ranges: heights });
        }}
      />
    </Container>
  );
}

export default App;
