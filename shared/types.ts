export type Point = {
	x: number;
	y: number;
};
export type Size = {
	width: number;
	height: number;
};

export type Node = {
	x: number;
	y: number;
	walkable: boolean;
};
export type ArrayBoard = Node[];

export type SearchResult = {
	visitOrder: Point[];
	visitedPaths: Point[][];
	totalSteps: number;
};

export type SearchAlgorithm = (
	start: Point,
	goal: Point,
	board: Node[][]
) => SearchResult;

export enum ControllerState {
	EditBoard,
	SearchActive,
	SearchDone
}

export enum Brush {
	Start = "start",
	Goal = "goal",
	Wall = "wall",
	Clear = "clear"
}

export enum Algorithm {
	Dijkstra = "dijkstra",
	Astar = "a-star"
}

export enum FieldState {
	Wall = "wall",
	Start = "start",
	Goal = "goal",
	Unvisited = "unvisited",
	Visited = "visited",
	Path = "path"
}
