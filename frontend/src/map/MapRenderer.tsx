import { useCallback, useEffect, useState } from "react";
import { MapParams, fetchMap } from "../api/map";
import "./style.css";
import { Layer, Stage, Image } from "react-konva";
import useImage from "use-image";
import { KonvaEventObject } from "konva/lib/Node";

interface MapRendererProps {
  params: MapParams;
}

const MapRenderer = (props: MapRendererProps) => {
  const { params } = props;
  const [imgUrl, setImgUrl] = useState<string>("");
  const [image] = useImage(imgUrl);
  const [stageScale, setStageScale] = useState<number>(1);
  const [stageX, setStageX] = useState<number>(0);
  const [stageY, setStageY] = useState<number>(0);

  const onScroll = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const scaleBy = 1.02;
    const stage = e.target.getStage();
    if (!stage) return;

    const position = stage.getPointerPosition();
    if (!position) return;

    const mouseX = position.x / stageScale - stage.x() / stageScale;
    const mouseY = position.y / stageScale - stage.y() / stageScale;
    console.log(position.x, stage.x(), stageScale, mouseX);

    const newScale =
      e.evt.deltaY > 0 ? stageScale * scaleBy : stageScale / scaleBy;
    setStageScale(newScale);
    setStageX((position.x / newScale - mouseX) * newScale);
    setStageY((position.y / newScale - mouseY) * newScale);
  };

  const updateCanvas = useCallback((map: String) => {
    setImgUrl(`http://localhost:5000/images/${map}?${Date.now().toString()}`);
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
      <Stage
        width={700}
        height={700}
        draggable={true}
        onWheel={onScroll}
        scaleX={stageScale}
        scaleY={stageScale}
        x={stageX}
        y={stageY}
      >
        <Layer>
          <Image image={image} />
        </Layer>
      </Stage>
    </div>
  );
};

export default MapRenderer;
