import { Point } from "../shared/types";

export const manhattan_distance = (a: Point, b: Point) => {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  return dx + dy;
};

export const euclidean_distance = (a: Point, b: Point) => {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  return Math.sqrt(dx * dx + dy * dy);
};
