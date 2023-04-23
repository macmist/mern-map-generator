import express from "express";

export const mapController = () => {
  return {
    generate: (req: express.Request, res: express.Response) => {
      return res.json("TO DO: generate a map");
    },
  };
};
