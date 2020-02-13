import Astar from "./a_star_base";
import AStarHeap from "./a_star_heap";
import { SearchAlgorithm } from "../shared/types";

const Dijkstra: SearchAlgorithm = (start, goal, board) => {
	return Astar(start, goal, board.flat(), () => 0);
};

const dijkstra2: SearchAlgorithm = (start, goal, board) => {
	return AStarHeap(start, goal, board, () => 0);
};

export default dijkstra2;
