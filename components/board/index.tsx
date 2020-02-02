import React, { FunctionComponent, memo } from "react";
import { Point } from "../../shared/types";
import Field from "../field";

type BoardProps = {
	width: number;
	height: number;
	onNodeClick: (point: Point) => void;
	isMousePressed: () => boolean;
};

const Board: FunctionComponent<BoardProps> = ({
	width,
	height,
	onNodeClick,
	isMousePressed
}) => {
	const matrix: Array<Array<Point>> = [];
	for (let y = 0; y < height; y++) {
		const row: Array<Point> = [];
		for (let x = 0; x < width; x++) {
			row.push({ x, y });
		}
		matrix.push(row);
	}

	return (
		<div>
			<table style={{ marginLeft: "auto", marginRight: "auto" }}>
				<tbody>
					{matrix.map((row, y_index) => (
						<tr key={`y_${y_index}`}>
							{row.map((field, x_index) => (
								<th key={`x_${x_index}`}>
									<Field
										{...{ ...field, isMousePressed }}
										onClick={onNodeClick}
									/>
								</th>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default memo(Board);
