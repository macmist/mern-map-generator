import React, { useState } from "react";
import "./App.css";
import MapRenderer from "./map/MapRenderer";
import MapOptions from "./map/MapOptions";
import { Container } from "@mui/material";
import { MapParams, getDefaultParams } from "./api/map";

function App() {
  const [params, setParams] = useState<MapParams>(getDefaultParams());
  return (
    <Container>
      <MapOptions
        onSubmit={(newParams) => setParams(newParams)}
        params={params}
      />
      <MapRenderer params={params} />
    </Container>
  );
}

export default App;
