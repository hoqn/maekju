import Button from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { MouseEventHandler, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends BaseProps, PropsWithChildren {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function IngrdButton({ children, className, onClick }: Props) {
  return (
    <Button
      intent="tonal"
      tint="base"
      size="lg"
      className={twMerge("flex-1", "text-base text-center flex flex-col", className)}
      onClick={onClick}
    >
      <div>{children}</div>
      <div className="border-t border-base-400">
        <div>아로마 홉</div>
      </div>
    </Button>
  );
}
