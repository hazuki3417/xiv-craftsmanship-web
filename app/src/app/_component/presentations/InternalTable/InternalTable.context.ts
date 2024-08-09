import { createContext, useContext } from "react";

export type SortType = "none" | "ascending" | "descending";
export type SortState = {
	name: SortType;
	quantity: SortType;
};

export interface InternalTableContextValue {
	sort: SortState;
	toggleSort: (target: keyof SortState) => void;
	sortIcon: (target: keyof SortState) => JSX.Element;
}

export const InternalTableContext = createContext<
	InternalTableContextValue | undefined
>(undefined);

export const useInternalTable = () => {
	const context = useContext(InternalTableContext);
	if (context === undefined) {
		throw new Error(
			"useInternalTable must be used within a InternalTableProvider",
		);
	}
	return context;
};
