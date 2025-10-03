import { Header } from "@/components/header";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price_html: string;
  description: string;
  short_description: string;
  images: Array<{ src: string; alt?: string }>;
  on_sale: boolean;
  regular_price: string;
  sale_price: string;
  categories: Array<{ id: number; name: string }>;
  tags: Array<{ id: number; name: string }>;
  stock_status: string;
  sku: string;
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(
    `https://training.thecosmicelectronics.com/wp-json/wc/v3/products/${params.id}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
        ).toString("base64")}`,
      },
      cache: "no-store",
    }
  );

  const product: Product = await res.json();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <div className="text-sm breadcrumbs mb-8">
          <ul>
            <li>
              <Link
                href="/"
                className="text-muted-foreground hover:text-accent"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-muted-foreground hover:text-accent"
              >
                Products
              </Link>
            </li>
            <li className="text-foreground">{product.name}</li>
          </ul>
        </div>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-secondary/20 rounded-2xl overflow-hidden">
              {product.on_sale && (
                <div className="badge badge-accent absolute top-6 left-6 z-10 border-none text-base px-4 py-3">
                  Sale
                </div>
              )}
              <img
                src={
                  product.images?.[0]?.src ||
                  "/placeholder.svg?height=600&width=600&query=electronics"
                }
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1, 5).map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-secondary/20 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                  >
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt || product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              {product.categories && product.categories.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {product.categories.map((category) => (
                    <span key={category.id} className="badge badge-outline">
                      {category.name}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-4 text-balance leading-tight">
                {product.name}
              </h1>
              {product.short_description && (
                <div
                  className="text-lg text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: product.short_description,
                  }}
                />
              )}
            </div>

            {/* Price */}
            <div className="mb-8">
              <div
                className="text-4xl font-bold mb-2"
                dangerouslySetInnerHTML={{ __html: product.price_html }}
              />
              {product.stock_status === "instock" ? (
                <div className="flex items-center gap-2 text-success">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>In Stock</span>
                </div>
              ) : (
                <div className="text-error">Out of Stock</div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button className="btn btn-primary btn-lg flex-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to Cart
              </button>
              <button className="btn btn-outline btn-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t border-border pt-8 space-y-4">
              {product.sku && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SKU:</span>
                  <span className="font-medium">{product.sku}</span>
                </div>
              )}
              {product.tags && product.tags.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tags:</span>
                  <div className="flex gap-2 flex-wrap justify-end">
                    {product.tags.map((tag) => (
                      <span key={tag.id} className="badge badge-sm">
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                <div>
                  <div className="font-semibold text-sm">Free Shipping</div>
                  <div className="text-xs text-muted-foreground">
                    On all orders
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <div>
                  <div className="font-semibold text-sm">Warranty</div>
                  <div className="text-xs text-muted-foreground">
                    2 year guarantee
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold mb-6">
              Product Description
            </h2>
            <div
              className="prose prose-lg max-w-none text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        )}

        {/* Back to Products */}
        <div className="text-center">
          <Link href="/" className="btn btn-outline btn-lg">
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Products
          </Link>
        </div>
      </main>
    </div>
  );
}
