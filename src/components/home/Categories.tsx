import Link from "next/link";

const categories = [
  { name: "Electronics", icon: "💻", slug: "electronics", count: 120 },
  { name: "Fashion", icon: "👗", slug: "fashion", count: 340 },
  { name: "Home & Living", icon: "🏠", slug: "home-living", count: 85 },
  { name: "Sports", icon: "⚽", slug: "sports", count: 210 },
  { name: "Beauty", icon: "💄", slug: "beauty", count: 95 },
  { name: "Books", icon: "📚", slug: "books", count: 450 },
];

export default function Categories() {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="text-center mb-10 text-white">
        <h2 className="text-3xl font-bold">Shop by Category</h2>
        <p className="mt-2">
          Find exactly what you are looking for
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/products?category=${cat.slug}`}
            className="card bg-base-200 hover:bg-primary hover:text-primary-content transition-all duration-300 cursor-pointer group"
          >
            <div className="card-body items-center text-center p-4">
              <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </span>
              <h3 className="font-semibold text-sm mt-2">{cat.name}</h3>
              <p className="text-xs opacity-60">{cat.count} items</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}