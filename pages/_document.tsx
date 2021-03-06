import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link
						href="https://fonts.googleapis.com/css?family=Noto+Sans&display=block"
						rel="stylesheet"
					/>
				</Head>
				<body style={{ margin: "0px" }}>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
export default MyDocument;
