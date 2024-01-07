import { UsedMalt } from "@/types/beer.types";
import { createContext, useContext } from "react";

interface LocalContext {
  malt: UsedMalt[];
  // hop: Hop[];
  // additives: 

  modal: "malts" | null;
}

const defaultLocalContext: LocalContext = {
  malt: [],
  modal: null,
  // hop: [],
};

export const LocalContext = createContext<LocalContext>({
  ...defaultLocalContext
});

export const useLocalContext = () => useContext(LocalContext);
