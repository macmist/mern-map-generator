import express from "express";
import { generateHeightMap } from "../business/mapBusiness";
import { ColorRange, defaultRangeArray } from "../lib/types";
import Jimp from "jimp";

const MAX_N = 13;
export const mapController = () => {
  return {
    generate: (req: express.Request, res: express.Response) => {
      const n =
        parseInt(<string>req.query.n) || parseInt(<string>req.body.n) || 10;
      const rb =
        parseInt(<string>req.query.rb) || parseInt(<string>req.body.rb) || 20;
      const seed = req.query.seed || req.body.seed || Date.now().toString();
      let heights = defaultRangeArray;
      if (req.body.heights && Array.isArray(req.body.heights)) {
        heights = req.body.heights.map((x: any) => {
          return { min: x.min, max: x.max, color: Jimp.cssColorToHex(x.color) };
        });
      }
      if (n <= 0 || n > MAX_N) {
        return res.status(400).json("n can only be between 0 and 13 included");
      }
      generateHeightMap(n, rb, heights, seed)
        .then((map) => {
          return res.json(map);
        })
        .catch((error) => {
          return res.status(400).json(error);
        });
    },
  };
};
