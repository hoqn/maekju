export type Amount = {
  value: number;
  unit: "kg" | "g" | "L" | "mL";
};

export type Malt = {
  name: string;
  type: "base" | "special";
  desc?: string;
};

export type Hop = {
  name: string;
  type: "base" | "special";
  desc?: string;
}

export type Yeast = {
  name: string;
  type: "base" | "special";
  desc?: string;
}
