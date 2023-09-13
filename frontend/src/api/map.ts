import { ColorRange, defaultRangeArray } from "../lib/types";

const API_BASE = "http://localhost:5000/";

export interface MapParams {
  seed?: string;
  n?: number;
  rb?: number;
  ranges?: Array<ColorRange>;
}

export const DEFAULT_N = 10;
export const DEFAULT_RB = 200;

export const getDefaultParams = (): MapParams => {
  return {
    seed: Date.now().toString(),
    n: DEFAULT_N,
    rb: DEFAULT_RB,
    ranges: defaultRangeArray,
  };
};

export const fetchMap = (params: MapParams): Promise<string> => {
  const { seed, n, rb, ranges } = params;

  return new Promise((resolve, reject) => {
    let url = API_BASE + `api/maps/generate?n=${n || 10}`;
    if (rb) {
      url += `&rb=${rb}`;
    }
    if (seed) {
      url += `&seed=${seed}`;
    }
    fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ heights: ranges }),
    })
      .then((result) => {
        result
          .json()
          .then((json) => resolve(json))
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });
};
