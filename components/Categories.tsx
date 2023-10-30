"use client";
import { Category } from "@prisma/client";

import { cn } from "@/lib/utils";
import qs from "query-string";
import {
  useRouter,
  useSearchParams,
  useServerInsertedHTML,
} from "next/navigation";
import { MouseEventHandler } from "react";

interface CategoriesProps {
  data: Category[];
}

export const Categories = ({ data }: CategoriesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = (id: string | undefined) => {
    const query = { categoryId: id };
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  };

  const categoryId = searchParams.get("categoryId");

  return (
    <div className="w-full overflow-x-auto space-x-2 flex p-1">
      <button
        onClick={onClick.bind(this, undefined)}
        className={cn(`
    flex
    items-center
    text-center
    text-xs
    md:text-sm
    px-2
    md:px-4
    py-2
    md:py-3
    rounded-md
    bg-primary/10
    hover:opacity-75
    transition
    ` , 
    !categoryId ? 'bg-primary/25' : "bg-primary/10"
    )}
      >
        Newest
      </button>
      {data.map((category) => {
        return (
          <button
            onClick={onClick.bind(this, category.id)}
            key={category.id}
            className={cn(
              `
        flex
        items-center
        text-center
        text-xs
        md:text-sm
        px-2
        md:px-4
        py-2
        md:py-3
        rounded-md
        bg-primary/10
        hover:opacity-75
        transition
        `,
              category.id === categoryId ? "bg-primary/25" : "bg-primary/10"
            )}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
};
