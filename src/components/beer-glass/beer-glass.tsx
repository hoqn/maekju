"use client";

import { twMerge } from "tailwind-merge";

import { CSSProperties, MouseEventHandler, useCallback, useLayoutEffect, useMemo, useState } from "react";
import beerColors from "@/data/srm-colors.json";
import { BrewedBeer } from "@/types/beer.types";
import { motion } from "framer-motion";

import "./beer-glass.css";
import { clampNumber } from "@/utils/math";

interface Props extends BaseProps {
  data: BrewedBeer;
  glassVolume?: number;
  beerVolume: number;
  isPouring?: boolean;
}

export default function BrewMachine({ className, data, glassVolume = 100, beerVolume, isPouring = false }: Props) {
  // 오로지 화면 구성을 위한 상태라 Hook이 아닌 여기 위치시킴
  const [isPouringStart, setPouringStart] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (!isPouringStart && isPouring) {
      setPouringStart(true);
      setTimeout(() => {
        setPouringStart(false);
      }, 100);
    }
  }, [isPouring]);

  const doOnMouseMove = useCallback<MouseEventHandler<HTMLDivElement>>((e) => {
    const x = (e.nativeEvent.offsetX - e.currentTarget.clientWidth / 2) / e.currentTarget.clientWidth;
    const y = (e.nativeEvent.offsetX - e.currentTarget.clientHeight / 2) / e.currentTarget.clientHeight;

    e.currentTarget.style.setProperty("--pers-x", `${x}`);
    e.currentTarget.style.setProperty("--pers-y", `${y}`);
  }, []);

  const doOnMouseLeave = useCallback<MouseEventHandler<HTMLDivElement>>((e) => {
    e.currentTarget.style.setProperty("--pers-x", ``);
    e.currentTarget.style.setProperty("--pers-y", ``);
  }, []);

  const refinedSrmColor = useMemo(() => beerColors.colors.color.find(it => it.srm * 10 == Math.round(clampNumber(data.srm, 0, 40) * 10)), [data.srm]);

  return (
    <>
      <div
        className={twMerge("beer-glass w-full", className)}
        onMouseMove={doOnMouseMove}
        onMouseLeave={doOnMouseLeave}
        style={{ "--liquid-color": refinedSrmColor?.rgb } as CSSProperties}
      >
        <div className="beer-glass__glass">
          <div
            className="beer-glass__liquid"
            style={{
              height: `${(beerVolume / glassVolume) * 100}%`,
            }}
          >
            <div className="beer-glass__foam"></div>
          </div>
        </div>
        <div className="beer-glass__glass-handle"></div>
        <div
          className={`beer-glass__pour ${
            isPouring
              ? isPouringStart
                ? "beer-glass__pour--start"
                : "beer-glass__pour--pouring"
              : "beer-glass__pour--default"
          }`}
        ></div>

        {/* 안내 */}
        <motion.div
          className="absolute z-40 top-1/2 -translate-y-1/2"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, transition: { duration: 0.3, delay: 8 } }}
          onAnimationEnd={(e) => (e.currentTarget.style.display = "none")}
        >
          <div className="whitespace-nowrap bg-base-600/50 text-base-50 rounded text-sm font-normal p-2 mt-2">
            <p>마우스를 올려보세요!</p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
