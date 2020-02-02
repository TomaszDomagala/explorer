import a_star_base from "./a_star_base";
import { SearchAlgorithm, Point } from "../shared/types";

const h = (point: Point, goal: Point) => {
	return Math.abs(point.x - goal.x) + Math.abs(point.y - goal.y);
};
const h2 = (point: Point, goal: Point) => {
	return Math.pow(point.x - goal.x, 2) + Math.pow(point.y - goal.y, 2);
};
const a_star: SearchAlgorithm = (start, goal, board) => {
	return a_star_base(start, goal, board, h2);
};

export default a_star;
