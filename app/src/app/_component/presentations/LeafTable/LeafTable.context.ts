import { createContext, useContext } from "react";

export type SortType = "none" | "ascending" | "descending";
export type SortState = {
	name: SortType;
	quantity: SortType;
};

export interface LeafTableContextValue {
	sort: SortState;
	toggleSort: (target: keyof SortState) => void;
	sortIcon: (target: keyof SortState) => JSX.Element;
}

export const LeafTableContext = createContext<
	LeafTableContextValue | undefined
>(undefined);

export const useLeafTable = () => {
	const context = useContext(LeafTableContext);
	if (context === undefined) {
		throw new Error("useLeafTable must be used within a LeafTableProvider");
	}
	return context;
};
