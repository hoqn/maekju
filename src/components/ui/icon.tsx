import { ComponentPropsWithoutRef, forwardRef } from "react";

interface Props extends Omit<ComponentPropsWithoutRef<"span">, "children"> {
  variant?: "sharp" | "outlined" | "rounded";
  name: string;
}

const Icon = forwardRef<HTMLSpanElement, Props>(({ variant = "rounded", name, ...restProps }, ref) => (
  <span className={`material-symbols-${variant}`} {...restProps}>{name}</span>
));

Icon.displayName = "Icon";

export default Icon;
