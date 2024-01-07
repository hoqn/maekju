"use client";

import { ReactNode } from "react";
import { useLocalContext } from "./_context";
import MaltsModal from "./(modal)/malts";

export default function Layout({ children }: { children: ReactNode }) {
  const { modal } = useLocalContext();

  return (
    <>
      {children}
      {modal === "malts" ? (<MaltsModal />) : null}
    </>
  )
}
