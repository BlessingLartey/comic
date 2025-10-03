import Link from "next/link";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price_html: string;
    images?: Array<{ src: string; alt?: string }>;
    permalink: string;
    short_description?: string;
    on_sale?: boolean;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card bg-card hover:shadow-xl transition-all duration-300 group">
      <figure className="relative overflow-hidden bg-secondary/20 aspect-square">
        {product.on_sale && (
          <div className="badge badge-accent absolute top-4 left-4 z-10 border-none">
            Sale
          </div>
        )}
        <img
          src={
            product.images?.[0]?.src ||
            "/placeholder.svg?height=400&width=400&query=electronics"
          }
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </figure>
      <div className="card-body p-6">
        <h3 className="card-title text-lg font-semibold text-balance leading-tight">
          {product.name}
        </h3>
        {product.short_description && (
          <div
            className="text-sm text-muted-foreground line-clamp-2"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />
        )}
        <div className="card-actions justify-between items-center mt-4">
          <div
            className="text-xl font-bold text-foreground"
            dangerouslySetInnerHTML={{ __html: product.price_html }}
          />
          <Link
            href={`/product/${product.id}`}
            className="btn btn-primary btn-sm"
          >
            View Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
