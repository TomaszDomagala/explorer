import objectHash from "object-hash";
import { Point, Node } from "../types";

export const nodeHash = ({ x, y }: Node) => {
	return objectHash({ x, y });
};
export const pointHash = ({ x, y }: Point) => {
	return objectHash({ x, y });
};
export const ntp = (node: Node): Point => ({ x: node.x, y: node.y });

export const pointId = ({ x, y }: Point): string => `x${x}y${y}`;

export const nodeId = (node: Node): string => pointId(ntp(node));

export const cmpPoints = (p1: Point, p2: Point) => {
	return p1.x === p2.x && p1.y === p2.y;
};

export function pair<A, B>(a: A, b: B): [A, B] {
	return [a, b];
}
