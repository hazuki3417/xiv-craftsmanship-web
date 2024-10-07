import { createContext, ReactNode, useContext } from "react";
import { SortState } from "@/app/hooks/useToggleSort";

interface SortButtonContextValue {
	label: string;
	icon: ReactNode;
	sort: () => void;
}

export interface CrystalTableContextValue {
	sort: SortState;
	name: SortButtonContextValue;
	quantity: SortButtonContextValue;
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
