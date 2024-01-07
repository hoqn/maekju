"use client";

import BeerGlass, { useBeerGlass } from "@/components/beer-glass";
import Navbar from "@/components/common/navbar";
import Button from "@/components/ui/button";
import Tooltip from "@/components/ui/tooltip";
import { calcEstimatedSrm } from "@/services/calculation";
import { useBeerBreweryStore } from "@/stores/beer-brewery.store";
import { useEffect, useState } from "react";

export default function Page({ searchParams: { b: breweryId } }: { searchParams: { b: string } }) {
  const { table, updateBeer } = useBeerBreweryStore();

  if (!(breweryId in table)) throw "잘못된 접근이에요";

  const beer = useBeerBreweryStore((s) => s.table[breweryId]);

  useEffect(() => {
    // SRM 계산
    updateBeer(breweryId, ({ ingredient: { malts } }) => ({
      srm: calcEstimatedSrm(malts, malts.length),
    }));
  }, []);

  const { pourBeer, drainBeer, isPouring, control } = useBeerGlass({
    glassVolume: 100,
    beer,
  });

  const [tooltip, setTooltip] = useState<"srm"|null>(null);

  return (
    <div className="w-full h-full dark-tdeme bg-base-50 text-base-950">
      <div className="container h-full min-h-full mx-auto px-6 flex flex-col -z-10">
        <Navbar.Inset />
        {/* HEAD */}
        <div>
          <h4 className="text-center text-2xl font-bold">{beer.name}</h4>
          <div className="mt-6">
            <table className="mx-auto">
              <tbody>
                <tr className="">
                  <td className="pr-2">SRM</td>
                  <td>{beer.srm}</td>
                </tr>
              </tbody>
            </table>
            <div className="text-center mt-2">
              <p className="text-sm text-base-900 underline cursor-help" onPointerOver={() => setTooltip("srm")} onPointerLeave={() => setTooltip(null)}>SRM이 무엇인가요?</p>
              <Tooltip containerClassName="mx-auto" className="min-w-64 left-0 top-4 -translate-x-1/2" open={tooltip === "srm"}>
                SRM은 맥주의 색을 나타내는 정량적 수치예요. 여기 써있는 값은 앞서 고른 재료들을 바탕으로 추정해서 계산한 값이랍니다.
              </Tooltip>
            </div>
          </div>
        </div>
        {/* BODY */}
        <div className="flex-1 flex flex-col justify-end items-center py-8">
          <BeerGlass {...control} />
          <div className="z-10 mt-8 flex flex-row space-x-2">
            <Button className="flex-1" tint="primary" intent="contained" disabled={isPouring} onClick={() => pourBeer(50)}>
              따르기
            </Button>
            <Button className="flex-1" tint="base" intent="tonal" disabled={isPouring} onClick={drainBeer}>
              버리기
            </Button>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
