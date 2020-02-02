import Astar from "./a_star_base";
import { SearchAlgorithm } from "../shared/types";

const Dijkstra: SearchAlgorithm = (start, goal, board) => {
	return Astar(start, goal, board, () => 0);
};

export default Dijkstra;
