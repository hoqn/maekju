"use client";

import Button from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import malts from "@/data/malts";
import { ChangeEventHandler, useCallback, useMemo, useState } from "react";

export default function MaltsModal() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const doOnChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setSearchQuery(e.currentTarget.value);
    },
    [setSearchQuery]
  );

  const items = useMemo(
    () =>
      searchQuery.length > 0
        ? malts.filter(({ name }) => name.toLowerCase().includes(searchQuery.replace(/\s/gi, "").toLowerCase()))
        : malts,
    [searchQuery]
  );

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 z-0 bg-base-950/50"></div>
      <div className="absolute z-10 container p-4 h-4/5 left-1/2 bottom-0 -translate-x-1/2">
        <div className="mx-auto h-full flex flex-col rounded-xl bg-base-50 border border-base-100 shadow-xl">
          <div className="p-4 flex flex-row items-center">
            <Button className="mr-4" intent="text" icon={() => <Icon name="close" />}></Button>
            <h2 className="text-xl font-bold">몰트</h2>
          </div>
          <div className="">
            <input
              className="w-full bg-base-100 rounded text-base leading-loose px-4 py-2"
              type="search"
              name="search-query"
              value={searchQuery}
              placeholder="검색해보세요"
              onChange={doOnChange}
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-base-200">
              {items.map(({ id, name, description, lovibond }) => (
                <li key={id} className="flex">
                  <div className="p-4 flex-1">
                    <div className="font-bold">{name}</div>
                    <div className="text-sm">
                      <div>L: {lovibond}</div>
                      <div className="mt-2">{description}</div>
                    </div>
                  </div>
                  <div className="p-4 pl-0">
                    <Button icon={() => <Icon name="add"/>} size="sm"></Button>
                    <div>{15}<span className="ml-1 text-sm">{"lbs"}</span></div>
                    <Button icon={() => <Icon name="remove"/>} size="sm"></Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
