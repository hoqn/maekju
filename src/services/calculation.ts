import { UsedMalt } from "@/types/beer.types";

export function calcEstimatedSrm(malts: UsedMalt[], volumeGal: number) {
  // 참고: https://www.highwoodsbrewing.com/srm-color.php

  const mcu = malts.reduce((ac, cu) => ac + (cu.amount.unit === "lbs" ? cu.amount.value : /* TODO: 다른 단위 지원? */0) * cu.item.lovibond, 0) / volumeGal;
  const srm = 1.4922 * (Math.pow(mcu, 0.6859));

  return srm;
}