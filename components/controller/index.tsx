import React, { FunctionComponent, useState } from "react";
import { Point, Brush, Node, Algorithm, FieldState } from "../../models/types";
import { nodeId, pointId, ntp, cmpPoints } from "../../common";
import { Button } from "rebass";
import { List, Map } from "immutable";
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

	const board: Array<Array<Node>> = [];
	for (let y = 0; y < height; y++) {
		const row: Array<Node> = [];
		for (let x = 0; x < width; x++) {
			row.push({ x, y, walkable: true });
		}
		board.push(row);
	}

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
		board[point.y][point.x].walkable = brush !== Brush.Wall;
		const isStart = cmpPoints(point, start);
		const isGoal = cmpPoints(point, goal);
		switch (brush) {
			case Brush.Start: {
				if (isGoal) setGoal(start);
				setStart(point);
				break;
			}
			case Brush.Goal: {
				if (isStart) setStart(goal);
				setGoal(point);
				break;
			}
			default: {
				if (isStart) setStart(ERROR_POINT);
				else if (isGoal) setGoal(ERROR_POINT);
			}
		}

		// if (brush === Brush.Start && cmpPoints(point, goal)) {
		// 	setGoal(start);
		// 	setStart(point);
		// } else if (brush === Brush.Goal && cmpPoints(point, start)) {
		// 	setStart(goal);
		// 	setGoal(point);
		// } else if (brush === Brush.Start) {
		// 	setStart(point);
		// } else if (brush === Brush.Goal) {
		// 	setStart(point);
		// } else if (cmpPoints(point, start)) {
		// 	setStart(ERROR_POINT);
		// } else if (cmpPoints(point, goal)) {
		// 	setGoal(ERROR_POINT);
		// }

		changeFieldState(point, brushStateMap.get(brush)!);
	};

	const animate = (steps: number, index: number, nodes: Array<Node>) => {
		const ceiling = Math.min(nodes.length, index + steps);
		for (let i = index; i < ceiling; i++) {
			changeFieldState(ntp(nodes[i]), FieldState.Visited);
		}
		if (ceiling < nodes.length) {
			requestAnimationFrame(() => animate(steps, index + steps, nodes));
		}
	};

	const startSearch = () => {
		const res = aStar(start, goal, board.flat(), () => 0);
		requestAnimationFrame(() => animate(10, 0, res.visitOrder));
	};

	return (
		<div>
			<OptionsBar
				{...{ changeAlgorithm, changeBrush, changeSize, startSearch }}
			/>
			<Board {...{ width, height, onNodeClick }} />
		</div>
	);
};

export default Controller;
