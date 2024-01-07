import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends BaseProps, PropsWithChildren {
  open?: boolean;
  containerClassName?: string;
}

export default function Tooltip({ className, open = false, children, containerClassName }: Props) {
  return (
    <div className={twMerge("relative w-0 h-0", containerClassName)}>
      {open && <div className={twMerge("absolute max-w-96 min-w-48 p-2 bg-base-200/50 text-base-950 border border-base-200/50 shadow rounded text-wrap text-sm", className)}>{children}</div>}
    </div>
  );
}
