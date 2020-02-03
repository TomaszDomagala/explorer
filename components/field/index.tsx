import React, { FunctionComponent } from "react";
import { Point } from "../../shared/types";
import { pointId } from "../../shared/helpers";
import "./style.scss";

type FieldProps = {
	x: number;
	y: number;
	onClick: (point: Point) => void;
	isMousePressed: () => boolean;
};
const Field: FunctionComponent<FieldProps> = ({
	x,
	y,
	onClick,
	isMousePressed
}) => (
	<div
		id={pointId({ x, y })}
		className="unvisited"
		style={{ width: "20px", height: "20px", userSelect: "none" }}
		onMouseDown={() => onClick({ x, y })}
		onMouseEnter={() => {
			if (isMousePressed()) {
				onClick({ x, y });
			}
		}}
	/>
);
export default Field;
