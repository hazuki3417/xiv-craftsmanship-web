import { createContext, ReactNode, useContext } from "react";
import { SortState } from "@/app/hooks/useToggleSort";

interface SortButtonContextValue {
	label: string;
	icon: ReactNode;
	sort: () => void;
}

export interface LeafTableContextValue {
	sort: SortState;
	name: SortButtonContextValue;
	quantity: SortButtonContextValue;
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
