import { Hop } from "@/types/beer.types";

export default [
  {
    id: 1,
    name: "비터링 홉",
    type: "bittering",
    description: "쓴 맛을 내기 위해 사용돼요."
  },
  {
    id: 2,
    name: "아로마 홉",
    type: "aroma",
    description: "쓴 맛보다 향을 내기 위해 사용돼요."
  },
] satisfies Hop[];