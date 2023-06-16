const API_BASE = "http://localhost:5000/";

export interface MapParams {
  seed?: string;
  n?: number;
  rb?: number;
}

export const DEFAULT_N = 10;
export const DEFAULT_RB = 200;

export const getDefaultParams = (): MapParams => {
  return { seed: Date.now().toString(), n: DEFAULT_N, rb: DEFAULT_RB };
};

export const fetchMap = (params: MapParams): Promise<string> => {
  const { seed, n, rb } = params;

  return new Promise((resolve, reject) => {
    let url = API_BASE + `api/maps/generate?n=${n || 10}`;
    if (rb) {
      url += `&rb=${rb}`;
    }
    if (seed) {
      url += `&seed=${seed}`;
    }
    fetch(url, { headers: { "Content-Type": "application/json" } })
      .then((result) => {
        result
          .json()
          .then((json) => resolve(json))
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });
};
