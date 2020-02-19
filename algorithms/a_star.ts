import a_star_base from "./a_star_base";
import a_star_heap from "./a_star_heap";
import { SearchAlgorithm, Point } from "../shared/types";
import { manhattan_distance, euclidean_distance } from "./heuristic_functions";
import board from "../components/board";

// const h = (point: Point, goal: Point) => {
//   return Math.abs(point.x - goal.x) + Math.abs(point.y - goal.y);
// };
// const h2 = (point: Point, goal: Point) => {
//   return Math.pow(point.x - goal.x, 2) + Math.pow(point.y - goal.y, 2);
// };
// const a_star: SearchAlgorithm = (start, goal, board) => {
//   return a_star_base(start, goal, board.flat(), h2);
// };

const a_star2: SearchAlgorithm = (start, goal, board) => {
  return a_star_heap(start, goal, board, manhattan_distance);
};
export default a_star2;
