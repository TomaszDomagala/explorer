import a_star_base from "./a_star_base";
import { SearchAlgorithm, Point } from "../shared/types";

const h = (node: Point, goal: Point) => {
	return Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y);
};
const a_star: SearchAlgorithm = (start, goal, board) => {
	return a_star_base(start, goal, board, h);
};

export default a_star;
