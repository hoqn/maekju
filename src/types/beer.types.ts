/**
 * Ingredient Types
 */

export type Ingredient<T extends string> = {
  id: number;
  name: string;
  type: T;
  description?: string;
}

export interface Malt extends Ingredient<"base" | "special"> {
  lovibond: number;
}

export interface Hop extends Ingredient<"bittering" | "aroma" | "dual"> {}

/**
 * Used Ingredient Types
 * (넣은 양을 함께 기록합니다)
 */

export type UsedIngredient<I extends Ingredient<string>, U extends string> = {
  item: I;
  amount: {
    value: number;
    unit: U;
  };
};

export interface UsedMalt extends UsedIngredient<Malt, "lbs"> { }

export interface UsedHop extends UsedIngredient<Hop, "lbs"> { }

/**
 * Brewed Beer Type
 * 양조된 맥주
 */

export interface BrewedBeer {
  ingredient: {
    malts: UsedMalt[];
    hops: UsedHop[];
  };
  name: string;
  brewer?: string;
  srm: number;
}