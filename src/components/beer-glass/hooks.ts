"use client";

import { BrewedBeer } from "@/types/beer.types";
import { useCallback, useMemo, useState } from "react";

interface UseBeerGlassOptions {
  glassVolume?: number;
  beer: BrewedBeer;
}

export function useBeerGlass({
  glassVolume = 100,
  beer,
}: UseBeerGlassOptions) {
  const [isPouring, setPouring] = useState<boolean>(false);
  const [beerVolume, setBeerVolume] = useState<number>(0);

  const volumeRatio = useMemo(() => (beerVolume / glassVolume) * 100, [beerVolume, glassVolume]);

  const pourBeer = useCallback((volume: number) => {
    setPouring(true);
    setTimeout(() => {
      setBeerVolume(prev => Math.min(prev + volume, glassVolume));
    }, 600 - volumeRatio * 2);
    setTimeout(() => {
      setPouring(false);
    }, 3000);
  }, []);

  const drainBeer = useCallback(() => {
    setBeerVolume(0);
  }, []);

  const control = {
    data: beer,
    beerVolume,
    glassVolume,
    isPouring,
  };

  return {
    pourBeer,
    drainBeer,
    beerVolume,
    glassVolume,
    isPouring,
    control,
  };
}