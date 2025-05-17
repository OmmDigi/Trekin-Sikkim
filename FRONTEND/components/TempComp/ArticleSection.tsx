import Image from "next/image";

const articles = [
    {
      title: "Top 10 Himalayan Treks for Beginners",
      summary:
        "Explore breathtaking yet beginner-friendly Himalayan trails. Perfect for your first adventure into the wild.",
      link: "#",
      image:
       "/new-images/trek-img1.jpg",
    },
    {
      title: "What to Pack for a Glacier Adventure",
      summary:
        "A complete checklist for glacier trekking essentials—from layers to boots and hydration packs.",
      link: "#",
      image:
        "/new-images/trek-img1.jpg",
    },
    {
      title: "How to Train for High Altitude Trekking",
      summary:
        "Prepare your body and mind for the mountains with altitude-specific workouts and routines.",
      link: "#",
      image:
        "/new-images/trek-img1.jpg",
    },
  ];
  
  const ArticleSection = () => {
    return (
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">
              Trekking Tips & Articles
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Stay informed and inspired before your next glacier adventure.
              Explore our curated blogs to elevate your trekking experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map((article, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  className="w-full h-52 object-cover"
                  height={720}
                  width={1200}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-3 mb-6">
                    {article.summary}
                  </p>
                  <a
                    href={article.link}
                    className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default ArticleSection;
  