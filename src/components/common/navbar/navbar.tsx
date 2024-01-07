"use client";

import { twMerge } from "tailwind-merge";
import Button from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { MouseEventHandler, useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useMotionValueEvent, useScroll } from "framer-motion";

interface Props extends BaseProps {
  navAction?: "close" | "back" | undefined | null;
  onClickNavAction?: MouseEventHandler<HTMLButtonElement>;
}

export default function Navbar({ className, navAction = "back", onClickNavAction }: Props) {
  const { scrollY } = useScroll();
  const [isScrollToTop, setScrollToTop] = useState<boolean>(scrollY.get() < 8);

  useMotionValueEvent(scrollY, "change", (value) => {
    if (!isScrollToTop && value < 8)
      setScrollToTop(true);
    else if (isScrollToTop && value > 8)
      setScrollToTop(false);
  });

  const icon = useMemo(
    () => (!!navAction ? () => <Icon name={navAction === "close" ? "close" : "arrow_back"} /> : undefined),
    [navAction]
  );

  const router = useRouter();
  const doOnClickNavAction = useMemo(
    () =>
      !!navAction && !onClickNavAction
        ? (((e) => {
            e.preventDefault();
            router.back();
          }) satisfies MouseEventHandler)
        : onClickNavAction,
    [navAction, onClickNavAction]
  );

  return (
    <header className={twMerge("w-full h-16 fixed top-0 left-0 right-0", className)}>
      <div className="container h-full mx-auto px-4 flex flex-row items-center">
        <Button intent={isScrollToTop ? "text" : "tonal"} tint="base" icon={icon} onClick={doOnClickNavAction} />
      </div>
    </header>
  );
}
