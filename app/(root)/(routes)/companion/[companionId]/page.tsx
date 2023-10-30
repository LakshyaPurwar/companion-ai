import prismadb from "@/lib/prismadb";
import { CompanionForm } from "./components/TrialForm";

interface CompanionPageProps {
  params: {
    companionId: string;
  };
}

const CompanionPage = async ({ params }: CompanionPageProps) => {
  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
    },
  });

  const categories = await prismadb.category.findMany();
  console.log("This is the companion found !", companion);
  console.log("This is the categories array found", categories);

  return <CompanionForm initialData={companion} categories={categories} />;
  // return <div>This is the id : {params.companionId}
  // </div>
};

export default CompanionPage;
