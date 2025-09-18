"use client";
import { useState } from "react";
import {
	Craft,
	Material,
	MaterialManagerProvider,
} from "./_component";
import { Grid, SegmentedControl, SegmentedControlItem } from "@mantine/core";

// NOTE: 仮実装（いずれ消す）
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/api/";

const segments: SegmentedControlItem[] = [
	{ value: "crafts", label: "crafts" },
	{ value: "materials", label: "materials" },
];

export default function Home() {
	const [segment, setSegment] = useState<string>("crafts");

	return (
		<>
			{/** segment */}
			<section>
				<Grid>
					<Grid.Col span={12}>
						<SegmentedControl
							value={segment}
							onChange={setSegment}
							data={segments}
						/>
					</Grid.Col>
				</Grid>
			</section>
			<section>
				<MaterialManagerProvider>
					{segment === "crafts" ? <Craft /> : <Material />}
				</MaterialManagerProvider>
			</section>
		</>
	);
}
