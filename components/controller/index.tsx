import React, {
	FunctionComponent,
	useState,
	useEffect,
	useRef,
	MutableRefObject
} from "react";
import {
	Point,
	Brush,
	Node,
	Algorithm,
	FieldState,
	ControllerState,
	SearchResult
} from "../../shared/types";
import { pointId, ntp, cmpPoints } from "../../shared/helpers";
import { Box } from "rebass";
import { Map } from "immutable";
import aStar from "../../algorithms/a_star";

import Board from "../board";
import OptionsBar from "../options_bar";

const bf = (brush: Brush, field: FieldState) => ({ brush, field });

const values = [
	bf(Brush.Wall, FieldState.Wall),
	bf(Brush.Clear, FieldState.Unvisited),
	bf(Brush.Start, FieldState.Start),
	bf(Brush.Goal, FieldState.Goal)
];
const tuples = values.map(v => [v.brush, v.field] as [Brush, FieldState]);
const brushStateMap: Map<Brush, FieldState> = Map(tuples);

const ERROR_POINT: Point = { x: -42, y: -42 };

const Controller: FunctionComponent = () => {
	const [{ width, height }, changeSize] = useState({ width: 20, height: 20 });
	const [brush, changeBrush] = useState(Brush.Wall);
	const [algorithm, changeAlgorithm] = useState(Algorithm.Dijkstra);
	const [start, setStart] = useState({ x: 0, y: 0 });
	const [goal, setGoal] = useState({ x: width - 1, y: height - 1 });
	const [ctrlState, setCtrlState] = useState(ControllerState.EditBoard);
	const animationId = useRef(0);
	const board: MutableRefObject<Node[][]> = useRef([]);
	useEffect(() => {
		for (let y = 0; y < height; y++) {
			const row: Array<Node> = [];
			for (let x = 0; x < width; x++) {
				row.push({ x, y, walkable: true });
			}
			const copy = board.current.slice();
			copy.push(row);
			board.current = copy;
		}
	}, []);

	const changeFieldState = (point: Point, state: FieldState) => {
		const id = pointId(point);
		const fieldRef = document.getElementById(id);
		if (fieldRef === null) {
			console.error(`${point} ${id} field not found`);
			return;
		}
		fieldRef!.className = state;
	};

	const onNodeClick = (point: Point) => {
		if (ctrlState === ControllerState.SearchActive) return;
		if (ctrlState === ControllerState.SearchDone) {
			clearAfterSearch();
			setCtrlState(ControllerState.EditBoard);
		}

		board.current[point.y][point.x].walkable = brush !== Brush.Wall;
		const isStart = cmpPoints(point, start);
		const isGoal = cmpPoints(point, goal);
		switch (brush) {
			case Brush.Start: {
				changeFieldState(start, FieldState.Unvisited);
				setStart(point);
				break;
			}
			case Brush.Goal: {
				changeFieldState(goal, FieldState.Unvisited);
				setGoal(point);
				break;
			}
			default: {
				if (isStart) setStart(ERROR_POINT);
				else if (isGoal) setGoal(ERROR_POINT);
			}
		}

		changeFieldState(point, brushStateMap.get(brush)!);
	};

	const animate = (index: number, stepsPerFrame: number, res: SearchResult) => {
		const { totalSteps, visitOrder, visitedPaths } = res;
		const ceiling = Math.min(totalSteps, index + stepsPerFrame);
		for (let i = index; i < ceiling; i++) {
			const point = ntp(visitOrder[i]);
			changeFieldState(point, FieldState.Visited);
		}
		visitedPaths[index - 1].forEach(({ x, y }) =>
			changeFieldState({ x, y }, FieldState.Visited)
		);
		visitedPaths[ceiling - 1].forEach(({ x, y }) =>
			changeFieldState({ x, y }, FieldState.Path)
		);

		changeFieldState(start, FieldState.Start);
		changeFieldState(goal, FieldState.Goal);
		if (ceiling < totalSteps) {
			animationId.current = requestAnimationFrame(() =>
				animate(index + stepsPerFrame, stepsPerFrame, res)
			);
		} else {
			setCtrlState(ControllerState.SearchDone);
		}
	};

	// const animate = (steps: number, index: number, nodes: Array<Node>) => {
	// 	const ceiling = Math.min(nodes.length, index + steps);
	// 	for (let i = index; i < ceiling; i++) {
	// 		const point = ntp(nodes[i]);
	// 		//TODO remove this for better performance?
	// 		if (!cmpPoints(point, start) && !cmpPoints(point, goal)) {
	// 			changeFieldState(point, FieldState.Visited);
	// 		}
	// 	}
	// 	if (ceiling < nodes.length) {
	// 		animationId.current = requestAnimationFrame(() =>
	// 			animate(steps, index + steps, nodes)
	// 		);
	// 	} else {
	// 		setCtrlState(ControllerState.SearchDone);
	// 	}
	// };

	const clearAfterSearch = () => {
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				changeFieldState(
					{ x, y },
					board.current[y][x].walkable ? FieldState.Unvisited : FieldState.Wall
				);
			}
		}
		changeFieldState(start, FieldState.Start);
		changeFieldState(goal, FieldState.Goal);
	};

	const startSearch = () => {
		if (ctrlState === ControllerState.SearchActive) return;
		if (ctrlState === ControllerState.SearchDone) {
			clearAfterSearch();
		}
		setCtrlState(ControllerState.SearchActive);
		const res = aStar(start, goal, board.current.flat(), () => 0);
		animationId.current = requestAnimationFrame(() => animate(0, 10, res));
	};

	useEffect(() => {
		changeFieldState(start, FieldState.Start);
		changeFieldState(goal, FieldState.Goal);
		return () => {
			cancelAnimationFrame(animationId.current);
		};
	}, []);

	return (
		<div>
			<OptionsBar
				{...{ changeAlgorithm, changeBrush, changeSize, startSearch }}
			/>
			<Box mt={4}>
				<Board {...{ width, height, onNodeClick }} />
			</Box>
		</div>
	);
};

export default Controller;
