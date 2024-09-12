import { createContext, useContext } from "react";

export type SortType = "none" | "ascending" | "descending";
export type SortState = {
	name: SortType;
	quantity: SortType;
};

export interface CrystalTableContextValue {
	sort: SortState;
	toggleSort: (target: keyof SortState) => void;
	sortIcon: (target: keyof SortState) => JSX.Element;
}

export const CrystalTableContext = createContext<
	CrystalTableContextValue | undefined
>(undefined);

export const useCrystalTable = () => {
	const context = useContext(CrystalTableContext);
	if (context === undefined) {
		throw new Error(
			"useCrystalTable must be used within a CrystalTableProvider",
		);
	}
	return context;
};
