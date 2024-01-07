import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, ComponentPropsWithoutRef, PropsWithChildren, PropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export const $Button = cva(
  [
    "relative overflow-hidden",
    "flex items-center justify-center font-medium border-solid border transition cursor-pointer",
    "disabled:cursor-not-allowed disabled:opacity-25",
  ],
  {
    variants: {
      tint: {
        primary: undefined,
        base: undefined,
      },
      intent: {
        contained: undefined,
        tonal: undefined,
        text: "bg-transparent border-transparent",
      },
      size: {
        sm: "min-h-8 px-3 py-1 rounded-md text-sm",
        md: "min-h-10 px-3 py-1 rounded-lg text-base",
        lg: "min-h-14 px-4 py-1 rounded-xl text-lg",
      },
    },
    compoundVariants: [
      {
        tint: "primary",
        intent: "contained",
        className: "bg-primary-600 active:bg-primary-700 text-primary-50 border-primary-600",
      },
      {
        tint: "base",
        intent: "contained",
        className: "bg-base-600 active:bg-base-700 text-base-50 border-base-600",
      },
      {
        tint: "primary",
        intent: "tonal",
        className: "bg-primary-100 active:bg-primary-200 text-primary-950 border-primary-200",
      },
      {
        tint: "base",
        intent: "tonal",
        className: "bg-base-100 active:bg-base-200 text-base-950 border-base-200",
      },
      {
        tint: "primary",
        intent: "text",
        className: "active:bg-primary-600/10 text-primary-900",
      },
      {
        tint: "base",
        intent: "text",
        className: "active:bg-base-600/10 text-base-900",
      },
    ],
    defaultVariants: {
      tint: "base",
      intent: "tonal",
      size: "md",
    },
  }
);

type SlottableProps<DefaultProps extends {} = {}> =
  | ({
      asChild?: false | null;
    } & DefaultProps)
  | { asChild: true };

type Props = BaseProps &
  PropsWithChildren &
  SlottableProps<ComponentPropsWithoutRef<"button">> &
  VariantProps<typeof $Button> & {
    icon?: () => React.ReactNode;
  };

export default function Button<AC extends boolean = false>({
  className,
  children,
  intent,
  tint,
  size,
  icon: Icon,
  asChild,
  ...restProps
}: Props) {
  const Component = asChild === true ? Slot : "button";

  return (
    <Component
      className={twMerge(
        $Button({
          intent,
          tint,
          size,
        }),
        className
      )}
      {...(restProps as any)}
    >
      {!!Icon ? (
        <>
          <span className={twMerge("inline-flex fill-current -ml-1 mr-1", !children && "-mr-1")}>
            <Icon />
          </span>
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </Component>
  );
}
