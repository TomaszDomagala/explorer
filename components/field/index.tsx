import React, { FunctionComponent } from "react";
import { Point } from "../../models/types";
import { pointId } from "../../common";
import "./style.scss";

type FieldProps = {
	x: number;
	y: number;
	onClick: (point: Point) => void;
};
const Field: FunctionComponent<FieldProps> = ({ x, y, onClick }) => (
	<div
		id={pointId({ x, y })}
		className="unvisited"
		style={{ width: "20px", height: "20px" }}
		onClick={() => onClick({ x, y })}
	/>
);
export default Field;
