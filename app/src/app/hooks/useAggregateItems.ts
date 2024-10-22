import { useMemo } from "react";
import { NodeDataType } from "./useMaterialTree";
import { aggregate } from "../functions/material";

export const useAggregateItems = (items: NodeDataType[]) => {
	return useMemo(() => aggregate(items), [items]);
};
