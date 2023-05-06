import Jimp from "jimp";
import { ColorRange } from "../lib/types";
import { DiamondSquare } from "../utils/diamondSquare";

export const generateHeightMap = (
  n: number,
  rb: number,
  rangeArray: Array<ColorRange>,
  seed: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const ds = new DiamondSquare(n, rb, seed);
    ds.generate().then(() => {
      toImage(ds, rangeArray)
        .then((image) => resolve(image))
        .catch((error) => reject(error));
    });
  });
};

const toImage = (
  ds: DiamondSquare,
  rangeArray: Array<ColorRange>
): Promise<string> => {
  const imageName = ds.seed + ".png";
  return new Promise((resolve, reject) => {
    new Jimp(ds.dimension, ds.dimension, (err, image) => {
      ds.matrix.forEach((row, y) => {
        if (err) return reject(err);
        row.forEach((pixel, x) => {
          image.setPixelColor(toColor(pixel, rangeArray), x, y);
        });
      });
      image.write("./public/images/" + imageName, (e) => {
        if (e) reject(e);
        return resolve(imageName);
      });
    });
  });
};
const toColor = (height: number, rangeArray: Array<ColorRange>) => {
  for (let range of rangeArray) {
    if (range.min <= height && range.max >= height) {
      return range.color;
    }
  }
  return toGray(height);
};

const toGray = (height: number) => {
  const gray = Math.trunc(height * 255);
  return Jimp.rgbaToInt(gray, gray, gray, 255);
};
