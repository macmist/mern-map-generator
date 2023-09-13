export type ColorRange = {
  min: number;
  max: number;
  color: string;
};

export const defaultRangeArray: Array<ColorRange> = [
  { min: 0, max: 0.1, color: "#05308d" },
  { min: 0.1, max: 0.2, color: "#153e97" },
  { min: 0.2, max: 0.3, color: "#0016ff" },
  { min: 0.3, max: 0.4, color: "#FFF8DC" },
  { min: 0.4, max: 0.5, color: "#DEB887" },
  { min: 0.5, max: 0.8, color: "#0d980d" },
  { min: 0.8, max: 0.9, color: "#8B4513" },
  { min: 0.9, max: 1, color: "#ffffff" },
];
