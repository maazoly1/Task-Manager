"use client";

import { createContext, useContext } from "react";
import { AppContextInterface } from "@/types/appContext";

export const AppContext = createContext<AppContextInterface>(
  {} as AppContextInterface
);

const useAppContext = () => useContext(AppContext);

export default useAppContext;
