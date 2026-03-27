import { createContext } from "react";
import { queryClient } from "../api/queryClient";

const QueryContext = createContext(queryClient);

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryContext.Provider value={queryClient}>
      {children}
    </QueryContext.Provider>
  );
};

export default QueryProvider;
