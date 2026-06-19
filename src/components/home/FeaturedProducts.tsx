import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    originalPrice: 149.99,
    image: "🎧",
    rating: 4.5,
    reviews: 128,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 79.99,
    originalPrice: 119.99,
    image: "👟",
    rating: 4.8,
    reviews: 256,
    category: "Sports",
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 199.99,
    originalPrice: 299.99,
    image: "⌚",
    rating: 4.6,
    reviews: 89,
    category: "Electronics",
  },
  {
    id: 4,
    name: "Backpack",
    price: 49.99,
    originalPrice: 79.99,
    image: "🎒",
    rating: 4.7,
    reviews: 312,
    category: "Fashion",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="text-base-content/60 mt-2">
              Handpicked just for you
            </p>
          </div>
          <Link href="/products" className="btn btn-outline btn-primary">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Discount Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="badge badge-error text-white">
                  -
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )}
                  %
                </span>
              </div>

              {/* Wishlist Button */}
              <button className="absolute top-3 right-3 z-10 btn btn-circle btn-sm btn-ghost bg-base-100 opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart size={16} />
              </button>

              {/* Product Image */}
              <figure className="bg-base-200 py-8 text-8xl text-center">
                {product.image}
              </figure>

              <div className="card-body p-4">
                <span className="badge badge-ghost badge-sm">
                  {product.category}
                </span>
                <h3 className="card-title text-base mt-1">{product.name}</h3>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="rating rating-sm">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <input
                        key={star}
                        type="radio"
                        className="mask mask-star-2 bg-warning"
                        checked={Math.round(product.rating) === star}
                        readOnly
                      />
                    ))}
                  </div>
                  <span className="text-xs text-base-content/60">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xl font-bold text-primary">
                    ${product.price}
                  </span>
                  <span className="text-sm text-base-content/50 line-through">
                    ${product.originalPrice}
                  </span>
                </div>

                <button className="btn btn-primary btn-sm mt-2 gap-2">
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}