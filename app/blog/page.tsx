import { Header } from "@/components/header";
import { BlogCard } from "@/components/blog-card";
import Link from "next/link";

export default async function BlogPage() {
  const res = await fetch(
    "https://training.thecosmicelectronics.com/wp-json/wp/v2/posts?_embed&per_page=12",
    {
      cache: "no-store",
    }
  );

  const posts = await res.json();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
            Stories & Insights
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explore the latest trends, expert reviews, and in-depth guides on
            cutting-edge electronics and technology.
          </p>
        </div>

        {/* Featured Post */}
        {posts.length > 0 && (
          <div className="mb-20">
            <div className="card lg:card-side bg-card border border-border overflow-hidden hover:shadow-2xl transition-all duration-300">
              <figure className="lg:w-1/2 relative aspect-[16/10] lg:aspect-auto">
                <div className="badge badge-accent absolute top-6 left-6 z-10 border-none text-base px-4 py-3">
                  Featured
                </div>
                <img
                  src={
                    posts[0]._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                    "/placeholder.svg?height=600&width=800&query=featured blog post" ||
                    "/placeholder.svg"
                  }
                  alt={posts[0].title.rendered}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body lg:w-1/2 p-8 lg:p-12">
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                  <span>
                    {posts[0]._embedded?.author?.[0]?.name || "Admin"}
                  </span>
                  <span>•</span>
                  <span>
                    {new Date(posts[0].date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="card-title font-[family-name:var(--font-playfair)] text-3xl lg:text-4xl mb-4 leading-tight text-balance">
                  {posts[0].title.rendered}
                </h2>
                <div
                  className="text-muted-foreground leading-relaxed line-clamp-4 mb-6"
                  dangerouslySetInnerHTML={{
                    __html: posts[0].excerpt.rendered,
                  }}
                />
                <div className="card-actions">
                  <Link
                    href={`/blog/${posts[0].slug}`}
                    className="btn btn-primary btn-lg gap-2"
                  >
                    Read Full Article
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
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold">
              Latest Articles
            </h2>
            <div className="flex gap-2">
              <select className="select select-bordered select-sm">
                <option>All Categories</option>
                <option>Reviews</option>
                <option>Guides</option>
                <option>News</option>
              </select>
            </div>
          </div>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(1).map((post: any) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-20 bg-primary text-primary-foreground rounded-2xl p-12 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold mb-4">
            Never miss an update
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest tech insights,
            product reviews, and exclusive offers delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <div className="join w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered join-item w-full text-foreground"
              />
              <button className="btn btn-accent join-item">Subscribe</button>
            </div>
          </div>
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
