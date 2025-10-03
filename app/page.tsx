import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";

export default async function Home() {
  const res = await fetch(
    "https://training.thecosmicelectronics.com/wp-json/wc/v3/products",
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
        ).toString("base64")}`,
      },
      cache: "no-store",
    }
  );

  // const products = await res.json()
  let products: any = [];
  try {
    products = await res.json();
  } catch (e) {
    console.error("Failed to parse products", e);
  }

  // Ensure products is an array
  if (!Array.isArray(products)) {
    console.error("Products is not an array:", products);
    products = [];
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
            Premium soaps, crafted for everyday luxury{" "}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Discover our carefully curated collection of handmade soaps that
            blend nourishing ingredients with soothing aromas for a refreshing
            experience.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <div className="text-center p-6 bg-card rounded-lg border border-border">
            <div className="text-3xl font-bold mb-2">{products.length}+</div>
            <div className="text-sm text-muted-foreground">Products</div>
          </div>
          <div className="text-center p-6 bg-card rounded-lg border border-border">
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Support</div>
          </div>
          <div className="text-center p-6 bg-card rounded-lg border border-border">
            <div className="text-3xl font-bold mb-2">Free</div>
            <div className="text-sm text-muted-foreground">Shipping</div>
          </div>
          <div className="text-center p-6 bg-card rounded-lg border border-border">
            <div className="text-3xl font-bold mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Authentic</div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold">
              Our Collection
            </h2>
            <div className="flex gap-2">
              <button className="btn btn-ghost btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filter
              </button>
              <select className="select select-bordered select-sm">
                <option>Sort by</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Ad Section */}
        <div className="mt-20 bg-primary text-primary-foreground rounded-2xl p-12 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold mb-4">
            Need help choosing?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Our expert team is here to guide you through our collection and help
            you find the perfect products for your needs.
          </p>
          <button className="btn btn-accent btn-lg">
            Book a Consultation
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Returns
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest updates on new products and exclusive offers.
              </p>
              <div className="join w-full">
                <input
                  type="email"
                  placeholder="Email address"
                  className="input input-bordered join-item w-full"
                />
                <button className="btn btn-primary join-item">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 Cosmic Electronics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
