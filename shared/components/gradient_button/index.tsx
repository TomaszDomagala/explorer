import React, {
	FunctionComponent,
	CSSProperties,
	PropsWithChildren
} from "react";
import "./style.scss";

type buttonStyle = "button" | "button--primary";

type GradientButtonProps = {
	className?: buttonStyle;
	style?: CSSProperties;
	onClick?: () => void;
};
type ButtonProps = {
	style?: CSSProperties;
	onClick?: () => void;
};
type buttonFactory = (btnStyle: buttonStyle) => FunctionComponent<ButtonProps>;

const GradientButtonBase: FunctionComponent<GradientButtonProps> = ({
	style,
	className,
	onClick,
	children
}) => {
	return <button {...{ style, className, onClick }}>{children}</button>;
};

const buttonFactory: buttonFactory = btnStyle => {
	return props => (
		<GradientButtonBase className={btnStyle} {...props}>
			{props.children}
		</GradientButtonBase>
	);
};

export const NormalButton = buttonFactory("button");
export const PrimaryButton = buttonFactory("button--primary");
