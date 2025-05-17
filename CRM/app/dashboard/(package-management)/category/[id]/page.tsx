import CategoryStepPage from "@/components/category/CategoryStepPage";

interface IProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ step: string }>;
}

export default async function SingleCategoryInfo({
  params,
  searchParams,
}: IProps) {
  const id = parseInt((await params).id);
  const step = parseInt((await searchParams).step || "1");
  return <CategoryStepPage category_id={id} step={step} />;
}
