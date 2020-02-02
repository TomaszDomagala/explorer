import React, { FunctionComponent, memo } from "react";
import { Brush, Algorithm, Size } from "../../shared/types";
import { Box, Flex, Button, Text } from "rebass";

import SelectMenu, { Select } from "./select_menu";
import EmojiItem from "./select_menu/emoji_item";

type OptionProps = {
	changeBrush: (brush: Brush) => void;
	changeAlgorithm: (algorithm: Algorithm) => void;
	changeSize: (size: Size) => void;
	startSearch: () => void;
};

type ItemData<T> = {
	data: T;
	text: string;
	symbol: string;
};

function item<T>(data: T, text: string, symbol: string): ItemData<T> {
	return {
		data,
		text,
		symbol
	};
}
const brushes: Array<ItemData<Brush>> = [
	item(Brush.Clear, "clear", "🧼"),
	item(Brush.Wall, "wall", "🧱"),
	item(Brush.Start, "start", "👋"),
	item(Brush.Goal, "goal", "🏁")
];

const algorithms: Array<ItemData<Algorithm>> = [
	item(Algorithm.Dijkstra, "dijkstra", "🧐"),
	item(Algorithm.Astar, "a-star", "⭐")
];

const SelectBrush: Select<ItemData<Brush>> = SelectMenu;
const SelectAlgorithm: Select<ItemData<Algorithm>> = SelectMenu;

const BrushComponent: FunctionComponent<{ item: ItemData<Brush> }> = ({
	item: { text, symbol }
}) => <EmojiItem {...{ text, symbol }} />;

const AlgorithmComponent: FunctionComponent<{ item: ItemData<Algorithm> }> = ({
	item: { text, symbol }
}) => <EmojiItem {...{ text, symbol }} />;

const OptionsBar: FunctionComponent<OptionProps> = props => {
	const { startSearch, changeBrush, changeAlgorithm } = props;

	return (
		<Flex>
			<Box mr={4}>
				<SelectBrush
					labelText="Select Brush"
					initIndex={1}
					items={brushes}
					onItemClick={(item: ItemData<Brush>) => {
						changeBrush(item.data);
					}}
					ItemComponent={BrushComponent}
				/>
			</Box>

			<SelectAlgorithm
				labelText="Select Algorithm"
				items={algorithms}
				onItemClick={(item: ItemData<Algorithm>) => {
					changeAlgorithm(item.data);
				}}
				ItemComponent={AlgorithmComponent}
			/>
			<Button
				my="auto"
				height={"2.rem"}
				ml={3}
				bg="limegreen"
				onClick={startSearch}
			>
				<Text fontFamily="Noto Sans" fontWeight="bold" fontSize={3}>
					Start
				</Text>
			</Button>
		</Flex>
	);
};

export default memo(OptionsBar);
