import { createContext, ReactNode, useContext } from "react";
import { SortState } from "@/app/hooks/useToggleSort";

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
