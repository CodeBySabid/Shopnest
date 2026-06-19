import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Banner() {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Banner 1 */}
        <div className="card bg-primary text-primary-content min-h-48">
          <div className="card-body justify-center">
            <p className="text-sm opacity-80">Limited Time Offer</p>
            <h3 className="card-title text-2xl">Summer Sale</h3>
            <p className="opacity-80">Up to 50% off on Fashion</p>
            <div className="card-actions mt-4">
              <Link
                href="/products?category=fashion"
                className="btn btn-sm bg-white text-primary hover:bg-white/90 gap-2"
              >
                Shop Now <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Banner 2 */}
        <div className="card bg-neutral text-neutral-content min-h-48">
          <div className="card-body justify-center">
            <p className="text-sm opacity-80">New Collection</p>
            <h3 className="card-title text-2xl">Electronics</h3>
            <p className="opacity-80">Latest gadgets at best prices</p>
            <div className="card-actions mt-4">
              <Link
                href="/products?category=electronics"
                className="btn btn-sm bg-white text-neutral hover:bg-white/90 gap-2"
              >
                Explore <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}