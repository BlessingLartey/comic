import { Header } from "@/components/header";
import Link from "next/link";

interface Post {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  modified: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
    author?: Array<{
      name: string;
      description: string;
      avatar_urls?: { [key: string]: string };
    }>;
    "wp:term"?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
      }>
    >;
  };
}

export default async function BlogPostDetail({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(
    `https://training.thecosmicelectronics.com/wp-json/wp/v2/posts?slug=${params.slug}&_embed`,
    {
      cache: "no-store",
    }
  );

  const posts: Post[] = await res.json();
  const post = posts[0];

  if (!post) {
    return <div>Post not found</div>;
  }

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const author = post._embedded?.author?.[0];
  const categories = post._embedded?.["wp:term"]?.[0] || [];
  const tags = post._embedded?.["wp:term"]?.[1] || [];

  const publishDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const readingTime = Math.ceil(post.content.rendered.split(" ").length / 200);

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
                href="/blog"
                className="text-muted-foreground hover:text-accent"
              >
                Blog
              </Link>
            </li>
            <li className="text-foreground">{post.title.rendered}</li>
          </ul>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            {categories.length > 0 && (
              <div className="flex gap-2 mb-6">
                {categories.map((category) => (
                  <span key={category.id} className="badge badge-primary">
                    {category.name}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl font-bold mb-6 text-balance leading-tight">
              {post.title.rendered}
            </h1>

            <div className="flex items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-3">
                {author?.avatar_urls && (
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img
                        src={author.avatar_urls["96"] || "/placeholder.svg"}
                        alt={author.name}
                      />
                    </div>
                  </div>
                )}
                <div>
                  <div className="font-semibold text-foreground">
                    {author?.name || "Admin"}
                  </div>
                  <div className="text-sm">{publishDate}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm">{readingTime} min read</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {featuredImage && (
            <figure className="mb-12 rounded-2xl overflow-hidden">
              <img
                src={featuredImage || "/placeholder.svg"}
                alt={post.title.rendered}
                className="w-full aspect-[21/9] object-cover"
              />
            </figure>
          )}

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none mb-12
              prose-headings:font-[family-name:var(--font-playfair)] 
              prose-headings:font-bold 
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:my-6 prose-ol:my-6
              prose-li:text-muted-foreground prose-li:mb-2
              prose-img:rounded-xl prose-img:my-8
              prose-blockquote:border-l-4 prose-blockquote:border-accent 
              prose-blockquote:pl-6 prose-blockquote:italic 
              prose-blockquote:text-foreground prose-blockquote:my-8
              prose-code:text-accent prose-code:bg-secondary/50 
              prose-code:px-2 prose-code:py-1 prose-code:rounded"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="border-t border-border pt-8 mb-12">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-semibold">Tags:</span>
                {tags.map((tag) => (
                  <span key={tag.id} className="badge badge-outline badge-lg">
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          {author && author.description && (
            <div className="bg-card border border-border rounded-2xl p-8 mb-12">
              <div className="flex items-start gap-6">
                {author.avatar_urls && (
                  <div className="avatar">
                    <div className="w-20 rounded-full">
                      <img
                        src={author.avatar_urls["96"] || "/placeholder.svg"}
                        alt={author.name}
                      />
                    </div>
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-2">
                    About {author.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {author.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Share Buttons */}
          <div className="flex items-center justify-between border-t border-b border-border py-6 mb-12">
            <span className="font-semibold">Share this article:</span>
            <div className="flex gap-2">
              <button className="btn btn-circle btn-ghost">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </button>
              <button className="btn btn-circle btn-ghost">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </button>
              <button className="btn btn-circle btn-ghost">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Back to Blog */}
          <div className="text-center">
            <Link href="/blog" className="btn btn-outline btn-lg">
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
              Back to Blog
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
