import React, { FunctionComponent } from "react";
import { useSpring, animated } from "react-spring";
import { Box } from "rebass";

type SelectItemProps<T> = {
	item: T;
	index: number;
	current: number;
	previous: number;
	ItemComponent: FunctionComponent<{ item: T }>;
};

function SelectItem<T>(props: SelectItemProps<T>) {
	const { index, current, previous, item, ItemComponent } = props;
	const isPicked = index === current;
	let float: "left" | "right";
	if (isPicked) {
		float = index - previous > 0 ? "left" : "right";
	} else {
		float = index - current > 0 ? "left" : "right";
	}
	const { width, opacity } = useSpring({
		width: isPicked ? "100%" : "0%",
		opacity: isPicked ? 1 : 0.5
	});

	return (
		<Box sx={{ cursor: "pointer", userSelect: "none" }} mx={2}>
			<animated.div style={{ opacity }}>
				<ItemComponent {...{ item }} />
			</animated.div>
			<animated.div
				style={{ float, background: "#D7BDE2", height: "7px", width }}
			/>
		</Box>
	);
}

export default SelectItem;
