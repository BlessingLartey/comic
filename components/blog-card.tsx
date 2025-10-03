import Link from "next/link";

interface BlogCardProps {
  post: {
    id: number;
    slug: string;
    title: { rendered: string };
    excerpt: { rendered: string };
    date: string;
    _embedded?: {
      "wp:featuredmedia"?: Array<{
        source_url: string;
        alt_text?: string;
      }>;
      author?: Array<{
        name: string;
      }>;
    };
  };
}

export function BlogCard({ post }: BlogCardProps) {
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const author = post._embedded?.author?.[0]?.name || "Admin";
  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="card bg-card border border-border hover:shadow-xl transition-all duration-300 group">
      <figure className="relative aspect-[16/10] overflow-hidden bg-secondary/20">
        <img
          src={
            featuredImage ||
            "/placeholder.svg?height=400&width=600&query=blog post"
          }
          alt={post.title.rendered}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </figure>
      <div className="card-body p-6">
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>{author}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{date}</span>
          </div>
        </div>

        <h2 className="card-title font-[family-name:var(--font-playfair)] text-2xl mb-3 leading-tight text-balance">
          {post.title.rendered}
        </h2>

        <div
          className="text-muted-foreground leading-relaxed line-clamp-3 mb-4"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />

        <div className="card-actions">
          <Link
            href={`/blog/${post.slug}`}
            className="btn btn-ghost btn-sm gap-2 group/btn"
          >
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform"
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
  );
}
