import App from "next/app";
import Head from "next/head";
import { NextPage, NextPageContext } from "next";
import React from "react";

type args = { Component: NextPage; ctx: NextPageContext };
export default class MyApp extends App {
	static async getInitialProps({ Component, ctx }: args) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps };
	}

	render() {
		const { Component, pageProps } = this.props;

		return (
			<>
				<Head>
					<title>Explorer: search visualization!</title>
				</Head>
				<Component {...pageProps} />
			</>
		);
	}
}
