import { twMerge } from "tailwind-merge";

export default function NavbarInset({ className }: BaseProps) {
  return <div className={twMerge("h-16", className)}></div>;
}
