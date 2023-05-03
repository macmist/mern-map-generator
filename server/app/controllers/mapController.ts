import express from "express";
import { DiamondSquare } from "../utils/diamondSquare";
import Jimp from "jimp";
import { defaultRangeArray } from "../lib/types";

export const mapController = () => {
  const toGray = (height: number) => {
    const gray = Math.trunc(height * 255);
    return Jimp.rgbaToInt(gray, gray, gray, 255);
  };
  const toColor = (height: number) => {
    for (let range of defaultRangeArray) {
      if (range.min <= height && range.max >= height) {
        return range.color;
      }
    }
    return toGray(height);
  };
  const toImage = (ds: DiamondSquare) => {
    const imageName = "myAwesomeMap.png";
    new Jimp(ds.dimension, ds.dimension, (err, image) => {
      ds.matrix.forEach((row, y) => {
        if (err) return;
        row.forEach((pixel, x) => {
          image.setPixelColor(toColor(pixel), x, y);
        });
      });
      image.write(imageName, (e) => {
        if (e) console.log(e);
      });
    });
    return imageName;
  };
  return {
    generate: (req: express.Request, res: express.Response) => {
      const ds = new DiamondSquare(10);
      ds.generate();
      return res.json(toImage(ds));
    },
  };
};
