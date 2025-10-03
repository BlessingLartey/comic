import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-secondary py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
              About Our Soap Shop
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Crafting luxurious, handmade soaps with natural ingredients and
              timeless care since our inception.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Our soap shop was born from a simple belief: skincare should
                  be natural, luxurious, and kind to both your skin and the
                  planet. What started as a small kitchen experiment has grown
                  into a trusted destination for handcrafted, artisanal soaps.
                </p>
                <p>
                  We carefully select every ingredient in our collection,
                  ensuring it meets our high standards for quality,
                  sustainability, and effectiveness. From nourishing oils to
                  botanical extracts, each ingredient is chosen with your skin's
                  health in mind.
                </p>
                <p>
                  Today, we serve thousands of satisfied customers worldwide,
                  but our mission remains unchanged: to provide exceptional
                  handmade soaps backed by unparalleled care and attention to
                  detail.
                </p>
              </div>
            </div>
            <div className="bg-secondary rounded-2xl aspect-square flex items-center justify-center">
              <img
                src="/artisan-handmade-soap-bars-with-natural-ingredient.jpg"
                alt="Handmade Soap Collection"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-32 bg-secondary">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card bg-background">
              <div className="card-body">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                  Natural Ingredients
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We never compromise on quality. Every soap is made with pure,
                  natural ingredients that are gentle on your skin and the
                  environment.
                </p>
              </div>
            </div>

            <div className="card bg-background">
              <div className="card-body">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
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
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                  Handcrafted
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Each bar is lovingly handcrafted in small batches, ensuring
                  attention to detail and the highest quality in every product.
                </p>
              </div>
            </div>

            <div className="card bg-background">
              <div className="card-body">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                  Customer Care
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your satisfaction is our priority. We're here to support you
                  every step of the way, from browsing to skincare advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="font-serif text-5xl lg:text-6xl font-bold text-accent mb-2">
                10K+
              </div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-5xl lg:text-6xl font-bold text-accent mb-2">
                100%
              </div>
              <div className="text-muted-foreground">Natural</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-5xl lg:text-6xl font-bold text-accent mb-2">
                50+
              </div>
              <div className="text-muted-foreground">Unique Scents</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-5xl lg:text-6xl font-bold text-accent mb-2">
                0
              </div>
              <div className="text-muted-foreground">Harsh Chemicals</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-accent text-accent-foreground">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Ready to Transform Your Skincare Routine?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of satisfied customers who trust our handmade soaps
            for their daily skincare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="btn btn-lg bg-background text-foreground hover:bg-background/90 border-none"
            >
              Shop Now
            </Link>
            <Link
              href="/contact"
              className="btn btn-lg btn-outline border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
