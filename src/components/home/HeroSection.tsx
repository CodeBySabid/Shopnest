"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="min-h-[90vh] bg-base-200 flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Text */}
          <div className="space-y-6">
            <div className="badge badge-primary badge-lg gap-2">
              <ShoppingBag size={14} />
              New Arrivals 2025
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Shop The{" "}
              <span className="text-primary">Latest</span>{" "}
              Trends
            </h1>

            <p className="text-base-content/70 text-lg max-w-md">
              Discover thousands of products at unbeatable prices. 
              From fashion to electronics — everything you need, 
              all in one place.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn btn-primary btn-lg gap-2">
                Shop Now
                <ArrowRight size={18} />
              </Link>
              <Link href="/about" className="btn btn-outline btn-lg">
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-primary">10K+</p>
                <p className="text-base-content/60 text-sm">Products</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">50K+</p>
                <p className="text-base-content/60 text-sm">Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">4.9★</p>
                <p className="text-base-content/60 text-sm">Rating</p>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative flex justify-center items-center">
            <div className="w-72 h-72 md:w-96 md:h-96 bg-primary/10 rounded-full flex items-center justify-center">
              <div className="w-56 h-56 md:w-72 md:h-72 bg-primary/20 rounded-full flex items-center justify-center">
                <ShoppingBag size={120} className="text-primary opacity-80" />
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute top-4 right-0 bg-base-100 shadow-xl rounded-2xl p-4 flex items-center gap-3">
              <div className="bg-success/20 p-2 rounded-full">
                <span className="text-success text-xl">✓</span>
              </div>
              <div>
                <p className="font-semibold text-sm">Free Shipping</p>
                <p className="text-xs text-base-content/60">On orders $50+</p>
              </div>
            </div>

            <div className="absolute bottom-4 left-0 bg-base-100 shadow-xl rounded-2xl p-4 flex items-center gap-3">
              <div className="bg-warning/20 p-2 rounded-full">
                <span className="text-warning text-xl">⚡</span>
              </div>
              <div>
                <p className="font-semibold text-sm">Flash Sale</p>
                <p className="text-xs text-base-content/60">Up to 50% off</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}