import Jimp from "jimp";

export type ColorRange = {
  min: number;
  max: number;
  color: number; // Jimp uses hex numbers for colors
};

export const defaultRangeArray: Array<ColorRange> = [
  { min: 0, max: 0.1, color: Jimp.cssColorToHex("#05308d") },
  { min: 0.1, max: 0.2, color: Jimp.cssColorToHex("#153e97") },
  { min: 0.2, max: 0.3, color: Jimp.cssColorToHex("#0016ff") },
  { min: 0.3, max: 0.4, color: Jimp.cssColorToHex("#FFF8DC") },
  { min: 0.4, max: 0.5, color: Jimp.cssColorToHex("#DEB887") },
  { min: 0.5, max: 0.8, color: Jimp.cssColorToHex("#0d980d") },
  { min: 0.8, max: 0.9, color: Jimp.cssColorToHex("#8B4513") },
  { min: 0.9, max: 1, color: Jimp.cssColorToHex("#ffffff") },
];
