import prismadb from "@/lib/prismadb"
import SearchInput from "@/components/SearchInput"
import { Categories } from "@/components/Categories";
export default async function Home(){
    const categories = await prismadb.category.findMany();

    return <div className="h-full p-4">
        <SearchInput />
        <Categories data={categories}/>
    </div>
}