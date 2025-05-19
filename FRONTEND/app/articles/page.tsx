import BlogListView from "@/components/Blogs/BlogListView";
import HeadingSubHeding from "@/components/HeadingSubHeding";

export default function page() {
  return (
    <section className="wrapper space-y-5 py-10 max-sm:py-3.5 pt-24">
      <HeadingSubHeding
        heading="Our Latest Articles"
        subheading="Our latest articles and guides to help you plan your next trek."
      />

      <BlogListView />
    </section>
  );
}
