import { createContext, useContext } from "react";


export interface DiagramContextValue {
  onChangeRootItemCount: (value: number | string) => void
}

export const DiagramContext = createContext<DiagramContextValue | undefined>(undefined);

export const useDiagram = () => {
  const context = useContext(DiagramContext);
  if (context === undefined) {
    throw new Error("useDiagram must be used within a DiagramProvider");
  }
  return context
}
