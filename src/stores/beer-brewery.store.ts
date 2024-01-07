import { BrewedBeer, UsedHop, UsedMalt } from "@/types/beer.types";
import { v4 as uuid } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BeerBreweryState {
  table: Record<string, BrewedBeer>;
}

interface BeerBreweryActions {
  reset: () => void;

  // Brewery
  addBrewery: () => string; // return UUID
  cleanBrewery: (id: string) => void;

  // Edit Metadata
  updateBeer: (breweryId: string, state: Partial<BrewedBeer> | ((prev: BrewedBeer) => Partial<BrewedBeer>)) => void;

  // Edit Ingredients
  setMalts: (breweryId: string, setState: (prev: UsedMalt[]) => UsedMalt[]) => void;
  updateMalt: (breweryId: string, maltId: number, setState: (prev: UsedMalt | null) => UsedMalt) => void;
  clearMalt: (breweryId: string, maltId: number) => void;
  findMalt: (breweryId: string, maltId: number) => UsedMalt | null;
  hasMalt: (breweryId: string, maltId: number) => boolean;

  setHops: (breweryId: string, setState: (prev: UsedHop[]) => UsedHop[]) => void;
  updateHop: (breweryId: string, hopId: number, setState: (prev: UsedHop | null) => UsedHop) => void;
  clearHop: (breweryId: string, hopId: number) => void;
  findHop: (breweryId: string, hopId: number) => UsedHop | null;
  hasHop: (breweryId: string, hopId: number) => boolean;
}

const defaultBeerBreweryState: BeerBreweryState = {
  table: {},
};

export const useBeerBreweryStore = create(persist<BeerBreweryState & BeerBreweryActions>((set, get) => ({
  ...defaultBeerBreweryState,

  reset: () => set({ ...defaultBeerBreweryState }),
  addBrewery() {
    const id = uuid();
    set((prev) => ({
      table: {
        ...prev.table,
        [id]: {
          name: "",
          srm: 0,
          ingredient: {
            malts: [],
            hops: [],
          }
        },
      }
    }));

    return id;
  },
  cleanBrewery(id) {
    set(prev => {
      const table = { ...prev.table };
      delete table[id];

      return { table };
    });
  },

  updateBeer(breweryId, state) {
    const t = get().table;

    if (breweryId in t) {
      const newState = typeof state === "function" ? state(t[breweryId]) : state;

      set(({ table }) => ({
        table: {
          ...table,
          [breweryId]: {
            ...table[breweryId],
            ...newState,
          },
        }
      }));
    }
  },

  setMalts(breweryId, setState) {
    if (breweryId in get().table) {
      set(({ table }) => {
        const newTable: typeof table = {
          ...table,
          [breweryId]: {
            ...table[breweryId],
            ingredient: {
              ...table[breweryId].ingredient,
              malts: setState(table[breweryId].ingredient.malts),
            }
          }
        }

        return {
          table: newTable
        };
      })
    }
  },
  clearMalt(breweryId, maltId) {
    const t = get().table;

    if (breweryId in t) {
      get().setMalts(breweryId, (prev) => prev.filter((v) => v?.item?.id != maltId));
    }
  },
  findMalt(breweryId, maltId) {
    const t = get().table;

    if (breweryId in t)
      return t[breweryId].ingredient.malts.find((v) => v?.item?.id == maltId) || null;
    else
      return null;
  },
  hasMalt(breweryId, maltId) {
    const t = get().table;

    return breweryId in t && t[breweryId].ingredient.malts.some((v) => v?.item?.id == maltId);
  },
  updateMalt(breweryId, maltId, setState) {
    const t = get().table;

    if (breweryId in t) {
      const index = t[breweryId].ingredient.malts.findIndex(v => v?.item?.id == maltId);

      if (index >= 0) {
        get().setMalts(breweryId, (prev) => {
          const newMalts = [...prev];
          newMalts[index] = setState(prev[index]);

          return newMalts;
        });
      } else {
        get().setMalts(breweryId, (prev) => {
          const newMalts = [...prev];
          newMalts.push(setState(null));

          return newMalts;
        });
      }
    }
  },

  setHops(breweryId, setState) {
    if (breweryId in get().table) {
      set(({ table }) => {
        const newTable: typeof table = {
          ...table,
          [breweryId]: {
            ...table[breweryId],
            ingredient: {
              ...table[breweryId].ingredient,
              hops: setState(table[breweryId].ingredient.hops),
            }
          }
        }

        return {
          table: newTable
        };
      })
    }
  },
  findHop(breweryId, hopId) {
    const t = get().table;

    if (breweryId in t)
      return t[breweryId].ingredient.hops.find(v => v?.item?.id == hopId) || null;
    else
      return null;
  },
  clearHop(breweryId, hopId) {
    const t = get().table;

    if (breweryId in t) {
      get().setHops(breweryId, (prev) => prev.filter((v) => v?.item?.id != hopId));
    }
  },
  hasHop(breweryId, hopId) {
    const t = get().table;

    return breweryId in t && t[breweryId].ingredient.hops.some((v) => v?.item?.id == hopId);
  },
  updateHop(breweryId, hopId, setState) {
    const t = get().table;

    if (breweryId in t) {
      const index = t[breweryId].ingredient.hops.findIndex(v => v?.item?.id == hopId);

      if (index >= 0) {
        get().setHops(breweryId, (prev) => {
          const newHops = [...prev];
          newHops[index] = setState(prev[index]);

          return newHops;
        });
      } else {
        get().setHops(breweryId, (prev) => {
          const newHops = [...prev];
          newHops.push(setState(null));

          return newHops;
        });
      }
    }
  },
}), {
  name: "beer-brewery"
}));