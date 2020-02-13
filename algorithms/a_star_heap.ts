import { SearchResult, Point, ArrayBoard, Node } from "../shared/types";
import Heap from "heap";
type heuristic_function = (node: Point, goal: Point) => number;

type GNode = {
	x: number;
	y: number;
	g: number;
	h: number;
	f: number;
	opened: boolean;
	closed: boolean;
	parent: GNode | null;
};

const gNode = ({ x, y }: Point | Node): GNode => ({
	x,
	y,
	g: 0,
	h: 0,
	f: 0,
	opened: false,
	closed: false,
	parent: null
});
const areEqual = (a: Point, b: Point): boolean => a.x === b.x && a.y === b.y;
const point = ({ x, y }: Point): Point => ({ x, y });
const directions = [
	[-1, 0],
	[1, 0],
	[0, 1],
	[0, -1]
];

const gNodeBoard = (matrix: Node[][]) => {
	const board: GNode[][] = [];
	matrix.forEach(row => board.push(row.map(gNode)));
	return board;
};

const pathTo = (node: GNode): Point[] => {
	const path: GNode[] = [node];
	let next = node.parent;
	while (next) {
		path.push(next);
		next = next.parent;
	}
	return path.reverse().map(point);
};

const a_star_heap = (
	start: Point,
	goal: Point,
	board: Node[][],
	estimateFunc: heuristic_function
): SearchResult => {
	const openList: Heap<GNode> = new Heap((a, b) => a.f - b.f);
	const startNode = gNode(start);
	const [width, height] = [board[0].length, board.length];
	const nodes = gNodeBoard(board);
	const visitOrder: Point[] = [];
	const visitedPaths: Point[][] = [];

	startNode.opened = true;
	openList.push(startNode);

	const estimate = (point: Point) => estimateFunc(point, goal);

	const getNeighbors = ({ x, y }: GNode) => {
		return directions
			.map(([dx, dy]) => ({ x: x + dx, y: y + dy }))
			.filter(({ x, y }) => 0 <= x && x < width && 0 <= y && y < height)
			.filter(({ x, y }) => board[y][x].walkable)
			.map(({ x, y }) => nodes[y][x]);
	};

	while (!openList.empty()) {
		const current = openList.pop();
		current.closed = true;
		visitOrder.push(point(current));
		visitedPaths.push(pathTo(current));
		if (areEqual(current, goal)) {
			break;
		}

		for (const neighbor of getNeighbors(current)) {
			const new_g = current.g + 1;
			if (!neighbor.opened || new_g < neighbor.g) {
				neighbor.g = new_g;
				neighbor.h = neighbor.h || estimate(neighbor);
				neighbor.f = neighbor.g + neighbor.h;
				neighbor.parent = current;

				if (!neighbor.opened) {
					neighbor.opened = true;
					openList.push(neighbor);
				} else {
					openList.updateItem(neighbor);
				}
			}
		}
	}
	return { visitOrder, visitedPaths, totalSteps: visitOrder.length };
};
export default a_star_heap;
