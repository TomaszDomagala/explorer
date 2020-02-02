import React from "react";
import { Text } from "rebass";
import Emoji from "../../../../shared/components/emoji";

type EmojiItemProps = {
	text: string;
	symbol: string;
};
const capitalize = (text: string) => {
	return text.charAt(0).toUpperCase() + text.slice(1);
};

function EmojiItem(props: EmojiItemProps) {
	const { text, symbol } = props;
	return (
		<Text mx={1} fontSize={3} fontFamily="Noto Sans">
			<Emoji
				style={{ marginRight: "5px", fontWeight: "normal" }}
				symbol={symbol}
			/>
			{capitalize(text)}
		</Text>
	);
}

export default EmojiItem;
