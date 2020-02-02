import React, { FunctionComponent, CSSProperties } from "react";

type EmojiProps = {
	symbol: string;
	label?: string;
	style?: CSSProperties;
};

const Emoji: FunctionComponent<EmojiProps> = props => (
	<span
		role="img"
		aria-label={props.label ? props.label : ""}
		aria-hidden={props.label ? "false" : "true"}
		{...props}
	>
		{props.symbol}
	</span>
);
export default Emoji;
