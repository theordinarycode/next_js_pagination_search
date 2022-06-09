import { createContext, useState } from "react";

export const DataContext = createContext();

export function DataContextProvider({ children }) {
  const [posts, setPosts] = useState([]);

  const data = {
    posts,
    setPosts,
  };

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
