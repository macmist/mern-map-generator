import React, { useCallback, useEffect, useRef } from "react";
import { MapParams, fetchMap } from "../api/map";

interface MapRendererProps {
  params: MapParams;
}

const MapRenderer = (props: MapRendererProps) => {
  const { params } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const updateCanvas = useCallback((map: String) => {
    const image = new Image();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    const size = params.n ? Math.pow(2, params.n) + 1 : 1025;

    if (canvas) {
      canvas.width = size;
      canvas.height = size;
    }
    image.src = `http://localhost:5000/images/${map}?${Date.now().toString()}`;
    image.onload = () => {
      if (ctx) ctx.drawImage(image, 0, 0);
    };
    image.crossOrigin = "anonymous";
  }, []);
  const generateImage = useCallback(() => {
    fetchMap(params)
      .then((map) => {
        updateCanvas(map);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [updateCanvas, params]);

  useEffect(() => {
    generateImage();
  }, [generateImage, params]);

  return (
    <div className="mapContainer">
      <div style={{ maxHeight: 1025, maxWidth: 1025, overflow: "scroll" }}>
        <canvas id="map" ref={canvasRef} width={1025} height={1025}></canvas>
      </div>
    </div>
  );
};

export default MapRenderer;
