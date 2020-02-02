import React, { FunctionComponent, useState, memo } from "react";
import { Brush, Algorithm, Size } from "../../models/types";
import { Flex, Button } from "rebass";

type OptionProps = {
	changeBrush: (brush: Brush) => void;
	changeAlgorithm: (algorithm: Algorithm) => void;
	changeSize: (size: Size) => void;
	startSearch: () => void;
};

const OptionsBar: FunctionComponent<OptionProps> = ({ startSearch }) => {
	return (
		<Flex>
			<Button onClick={startSearch}>Start</Button>
		</Flex>
	);
};

export default memo(OptionsBar);
