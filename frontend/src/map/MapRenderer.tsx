import React, { useCallback, useEffect, useRef } from "react";
const API_BASE = "http://localhost:5000/";
const MapRenderer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const updateCanvas = useCallback((map: string) => {
    const image = new Image();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    image.src = "http://localhost:5000/images/" + map;
    image.onload = () => {
      if (ctx) ctx.drawImage(image, 0, 0);
    };
    image.crossOrigin = "anonymous";
  }, []);
  const generateImage = useCallback(() => {
    const url = API_BASE + "api/maps/generate?n=10";
    fetch(url, { headers: { "Content-Type": "application/json" } })
      .then((result) => {
        result
          .json()
          .then((json) => updateCanvas(json))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, [updateCanvas]);

  useEffect(() => {
    generateImage();
  }, [generateImage]);
  return (
    <div className="mapContainer">
      <canvas id="map" ref={canvasRef} width={1025} height={1025} />
    </div>
  );
};

export default MapRenderer;
