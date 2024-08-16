"use client";
import {
	Container,
	Flex,
	MantineTheme,
	rem,
	useMantineTheme,
} from "@mantine/core";
import { FC } from "react";

const makeStyle = (theme: MantineTheme) => {
	return {
		header: {
			borderBottom: `${rem("1px")} solid ${theme.colors.gray[3]}`,
			marginBottom: theme.spacing.xs,
			paddingLeft: theme.spacing.xs,
			paddingRight: theme.spacing.xs,
		},
		inner: {
			height: rem(40),
		},
	};
};

export const Header: FC = () => {
	const style = makeStyle(useMantineTheme());
	return (
		<header style={style.header}>
			<Container fluid>
				<Flex justify="flex-start" align="center" style={style.inner}>
					xiv-craftsmanship ver.β
				</Flex>
			</Container>
		</header>
	);
};
