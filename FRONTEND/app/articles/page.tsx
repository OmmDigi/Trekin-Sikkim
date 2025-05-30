import BlogListView from "@/components/Blogs/BlogListView";
import HeadingSubHeding from "@/components/HeadingSubHeding";

interface IProps {
  searchParams : Promise<{page? : string}>
}

export default async function page({ searchParams } : IProps) {
  const newSearchParams = (await searchParams)
  return (
    <section className="wrapper space-y-5 py-10 max-sm:py-3.5 pt-3.5">
      <HeadingSubHeding
        heading="Our Latest Articles"
        subheading="Our latest articles and guides to help you plan your next trek."
      />

      <BlogListView searchParams={newSearchParams}/>
    </section>
  );
}
