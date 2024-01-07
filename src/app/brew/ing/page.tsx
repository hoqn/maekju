"use client";

import Navbar from "@/components/common/navbar";
import Button from "@/components/ui/button";
import malts from "@/data/malts";
import { cva } from "class-variance-authority";
import { useEffect, useMemo, useState } from "react";
import MaltsModal from "./(modal)/malts";
import { useBeerBreweryStore } from "@/stores/beer-brewery.store";
import hops from "@/data/hops";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const $ = {
  IngrdButton: "flex-1",
};

const $IngredSelection = cva(["flex-1 min-w-64 md:min-w-96 bg-base-100 text-base-950 rounded transition"], {
  variants: {
    state: {
      selected: "outline outline-2 outline-primary-300 bg-primary-100 active:bg-primary-200",
      unselected: "outline outline-1 outline-base-200 active:bg-base-200",
    },
  },
  defaultVariants: {
    state: "unselected",
  },
});

export default function Page({ searchParams }: { searchParams: { b: string } }) {
  const [modal, setModal] = useState<"malts" | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  // TODO: 일단은 하나의 table만 지원하지만, 이후 여러 개 테이블 지원?
  const {
    table,
    addBrewery,
    updateBeer,

    // Malts
    updateMalt,
    clearMalt,
    hasMalt,

    // Hops
    updateHop,
    clearHop,
    hasHop,
  } = useBeerBreweryStore();

  const breweryId = useMemo(() => {
    if (searchParams.b in table) {
      return searchParams.b;
    } else {
      const id = addBrewery();
      router.replace(`${pathname}?b=${id}`);
      
      return id;
    }
  }, []);

  return (
    <>
      <div className="w-full min-h-full bg-base-50">
        <div className="container mx-auto px-6">
          <Navbar.Inset />
          <div className="flex flex-col">
            <div>재료를 선택해주세요</div>

            <div className="divide-y divide-base-200">
              <section className="py-6">
                <h4 className="text-lg font-bold">몰트</h4>
                <div className="text-base text-base-900">맥주의 주재료로, 맛과 색을 크게 좌우해요.</div>
                <div className="mt-6 flex flex-row flex-wrap gap-4">
                  {malts.map((malt) => (
                    <div
                      key={malt.id}
                      className={$IngredSelection({
                        className: "cursor-pointer",
                        state: hasMalt(breweryId, malt.id) ? "selected" : "unselected",
                      })}
                      onClick={() =>
                        hasMalt(breweryId, malt.id)
                          ? clearMalt(breweryId, malt.id)
                          : updateMalt(breweryId, malt.id, () => ({
                              item: malt,
                              amount: {
                                value: 1,
                                unit: "lbs",
                              },
                            }))
                      }
                    >
                      <div className="p-4 space-x-2 flex flex-row items-center">
                        <div
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: `hsla(41, 100%, ${(1 - malt.lovibond / 500) * 80}%, 1)` }}
                        ></div>
                        <div className="font-medium">{malt.name}</div>
                      </div>
                      <div className="text-base-900 px-4 pb-4">
                        <p>{malt.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="py-6">
                <h4 className="text-lg font-bold">홉</h4>
                <div className="text-base text-base-900">홉은 맥주의 향과 특유의 쓴맛을 더해줘요.</div>
                <div className="mt-6 flex flex-row flex-wrap gap-4">
                  {hops.map((hop) => (
                    <div
                      key={hop.id}
                      className={$IngredSelection({
                        className: "cursor-pointer",
                        state: hasHop(breweryId, hop.id) ? "selected" : "unselected",
                      })}
                      onClick={() =>
                        hasHop(breweryId, hop.id)
                          ? clearHop(breweryId, hop.id)
                          : updateHop(breweryId, hop.id, () => ({
                              item: hop,
                              amount: {
                                value: 1,
                                unit: "lbs",
                              },
                            }))
                      }
                    >
                      <div className="p-4 space-x-2 flex flex-row items-center">
                        <div className="font-medium">{hop.name}</div>
                      </div>
                      <div className="text-base-900 px-4 pb-4">
                        <p>{hop.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              <section className="py-6">
                <h4 className="text-lg font-bold">이름</h4>
                <div className="text-base text-base-900">맥주의 이름을 정해주세요.</div>
                <div className="mt-6 flex flex-row flex-wrap gap-4">
                  <input className="block w-full leading-8 px-2" name="name" type="text" onBlur={(e) => {
                    updateBeer(breweryId, { name: e.currentTarget.value });
                  }} defaultValue={breweryId in table ? table[breweryId].name: ""} />
                </div>
              </section>

              {/* <section className="py-6">
                <h4 className="text-lg font-bold">부가물/첨가물</h4>
                <div className="text-base text-base-900">
                  추가적인 부가물이나 첨가물을 넣어 특별한 맛을 더할 수도 있어요.
                </div>
              </section> */}
            </div>
          </div>

          {/* Bottom Inset */}
          <div style={{ height: "7.5rem" }}></div>
        </div>
        <div className="fixed bottom-0 left-0 right-0">
          <div className="h-12 from-base-50 to-transparent bg-gradient-to-t"></div>
          <div className="container mx-auto px-4 pb-4 bg-base-50">
            <Button
              className="w-full shadow-lg active:shadow-none rounded-2xl"
              intent="contained"
              tint="primary"
              size="lg"
              asChild
            >
              <Link href={`/brew/ed?b=${breweryId}`}>다 골랐어요</Link>
            </Button>
          </div>
        </div>
        <Navbar />
      </div>

      {/* Modal */}
      {modal === "malts" ? <MaltsModal /> : null}
    </>
  );
}
