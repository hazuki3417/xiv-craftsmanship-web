import { createContext, ReactNode, useContext } from "react";

export type SortType = "none" | "ascending" | "descending";
export type SortState = {
	name: SortType;
	quantity: SortType;
};

interface SortButtonContextValue {
	label: string;
	icon: ReactNode;
	sort: () => void;
}

export interface InternalTableContextValue {
	sort: SortState;
	name: SortButtonContextValue;
	quantity: SortButtonContextValue;
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
