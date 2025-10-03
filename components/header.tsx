import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-6 bg-foreground rounded-sm" />
              <div className="w-2 h-6 bg-foreground rounded-sm" />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              COSMIC SOAPS
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/post-product"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Post
            </Link>
            <Link
              href="/"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              About
            </Link>
            <Link
              href="/"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="btn btn-ghost btn-circle">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <div className="indicator">
              <span className="indicator-item badge badge-sm bg-accent text-accent-foreground border-none">
                0
              </span>
              <button className="btn btn-ghost btn-circle">
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
