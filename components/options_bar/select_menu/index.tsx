import React, { FunctionComponent, useState } from "react";
import { Box, Flex, Text } from "rebass";
import SelectItem from "./select_item";

type SelectMenuProps<T> = {
	labelText: string;
	items: Array<T>;
	onItemClick: (item: T) => void;
	ItemComponent: FunctionComponent<{ item: T }>;
	initIndex?: number;
};

function SelectMenu<T>(props: SelectMenuProps<T>) {
	const { labelText, items, ItemComponent, onItemClick, initIndex } = props;
	const [current, selectItem] = useState(initIndex ? initIndex : 0);

	return (
		<Box>
			<Text ml={3} sx={{ opacity: 0.87 }} fontFamily="Noto Sans">
				{labelText}
			</Text>
			<Flex>
				{items.map((item, index) => (
					<div
						key={index}
						onClick={() => {
							onItemClick(item);
							selectItem(index);
						}}
					>
						<SelectItem {...{ index, item, current, ItemComponent }} />
					</div>
				))}
			</Flex>
		</Box>
	);
}
export interface Select<T> extends FunctionComponent<SelectMenuProps<T>> {}
export default SelectMenu;
