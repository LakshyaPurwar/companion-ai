import prismadb from "@/lib/prismadb";
import SearchInput from "@/components/SearchInput";
import { Categories } from "@/components/Categories";
import Companions from "@/components/Companions";

interface RootPageProps {
  searchParams: {
    name: string;
    categoryId: string;
  };
}

export default async function Home({ searchParams }: RootPageProps) {
  const data = await prismadb.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    <div className="h-full p-4">
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  );
}
