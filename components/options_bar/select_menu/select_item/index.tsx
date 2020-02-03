import React, { FunctionComponent } from "react";
import { useSpring, animated, config } from "react-spring";
import { Box } from "rebass";

type SelectItemProps<T> = {
	item: T;
	index: number;
	current: number;
	ItemComponent: FunctionComponent<{ item: T }>;
};

function SelectItem<T>(props: SelectItemProps<T>) {
	const { index, current, item, ItemComponent } = props;
	const isPicked = index === current;

	const { opacity } = useSpring({
		opacity: isPicked ? 1 : 0.5,
		config: { tension: 300 }
	});

	return (
		<Box sx={{ cursor: "pointer", userSelect: "none" }} mx={2}>
			<animated.div style={{ opacity }}>
				<ItemComponent {...{ item }} />
			</animated.div>
		</Box>
	);
}

export default SelectItem;
