import { Set, Map, has } from "immutable";
import { Point, Node, ArrayBoard, SearchResult } from "../models/types";
import { pointHash, nodeHash, ntp } from "../common";

type heuristic_function = (node: Point, goal: Point) => number;
const point = (x: number, y: number): Point => ({ x, y });
const a_star = (
	start: Point,
	goal: Point,
	board: ArrayBoard,
	estimateFunction: heuristic_function
): SearchResult => {
	let startHash = pointHash(start);
	let goalHash = pointHash(goal);

	const estimate = (node: Node) => estimateFunction(ntp(node), goal);

	let openSet: Set<string> = Set([pointHash(start)]);
	let hashToNodeMap: Map<string, Node> = Map();
	let cameFrom: Map<string, string> = Map();
	let gScore: Map<string, number> = Map();
	let fScore: Map<string, number> = Map();
	const visited: Array<string> = [];
	const visitedPaths: Node[][] = [];
	visitedPaths[-1] = [];
	board.forEach(node => {
		const hash = nodeHash(node);
		hashToNodeMap = hashToNodeMap.set(hash, node);
		gScore = gScore.set(hash, Infinity);
		fScore = fScore.set(hash, Infinity);
	});
	gScore = gScore.set(startHash, 0);
	fScore = fScore.set(startHash, estimateFunction(start, goal));

	const pathOf = (hash: string) => {
		const path: Array<string> = [hash];
		let next = cameFrom.get(hash);
		while (next) {
			path.push(next);
			next = cameFrom.get(next);
		}
		return path.reverse().map(hash => hashToNodeMap.get(hash)!);
	};
	const getNewCurrent = (): string => {
		let currentDistance = Infinity;
		let current = "";
		openSet.forEach(hash => {
			const dist = fScore.get(hash)!;
			if (dist < currentDistance) {
				current = hash;
				currentDistance = dist;
			}
		});
		return current;
	};
	const getNeighbours = (nodeHash: string) => {
		const directions = [
			[-1, 0],
			[1, 0],
			[0, 1],
			[0, -1]
		];
		const neighbours: Array<string> = [];
		const { x, y } = hashToNodeMap.get(nodeHash)!;
		directions.forEach(([dx, dy]) => {
			const neighborHash = pointHash(point(x + dx, y + dy));
			if (
				hashToNodeMap.has(neighborHash) &&
				hashToNodeMap.get(neighborHash)?.walkable
			) {
				neighbours.push(neighborHash);
			}
		});
		return neighbours;
	};
	const getVisitedOrder = () => visited.map(hash => hashToNodeMap.get(hash)!);
	while (!openSet.isEmpty()) {
		const currentHash = getNewCurrent();
		visited.push(currentHash);
		visitedPaths.push(pathOf(currentHash));
		if (currentHash === goalHash) {
			break;
			// return {
			// 	visitOrder: getVisitedOrder(),
			// 	visitedPaths
			// };
		}
		openSet = openSet.remove(currentHash);
		getNeighbours(currentHash).forEach(hash => {
			const tentative_gScore = 1 + gScore.get(currentHash)!;
			const node = hashToNodeMap.get(hash);
			if (tentative_gScore < gScore.get(hash)!) {
				cameFrom = cameFrom.set(hash, currentHash);
				gScore = gScore.set(hash, tentative_gScore);
				fScore = fScore.set(hash, tentative_gScore + estimate(node!));

				openSet = openSet.add(hash);
				// if (!openSet.has(hash)) {
				// 	openSet = openSet.add(hash);
				// }
			}
		});
	}
	return {
		visitOrder: getVisitedOrder(),
		visitedPaths,
		totalSteps: visitedPaths.length
	};
};

export default a_star;
