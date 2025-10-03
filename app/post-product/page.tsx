"use client";

import type React from "react";

import { Header } from "@/components/header";
import { useState } from "react";

export default function PostProduct() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    const productData = {
      name: formData.get("name"),
      type: "simple",
      regular_price: formData.get("price"),
      description: formData.get("description"),
      short_description: formData.get("short_description"),
      categories: [{ id: Number.parseInt(formData.get("category") as string) }],
      images: formData.get("image_url")
        ? [{ src: formData.get("image_url") }]
        : [],
      stock_status: formData.get("stock_status"),
      manage_stock: true,
      stock_quantity: Number.parseInt(formData.get("stock_quantity") as string),
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error("Failed to create product");

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError("Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 lg:px-8 py-12 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-3">
            Add New Soap Product
          </h1>
          <p className="text-muted-foreground text-lg">
            Create a new handcrafted soap listing for your store
          </p>
        </div>

        {success && (
          <div className="alert alert-success mb-8 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Product created successfully!</span>
          </div>
        )}

        {error && (
          <div className="alert alert-error mb-8 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Section */}
          <div className="card bg-card border border-border shadow-sm">
            <div className="card-body p-8">
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold mb-6 pb-3 border-b border-border">
                Basic Information
              </h2>

              <div className="space-y-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base">
                      Product Name *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g., Lavender Dreams Soap Bar"
                    className="input input-bordered w-full text-base"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base">
                      Short Description
                    </span>
                  </label>
                  <textarea
                    name="short_description"
                    placeholder="A brief, catchy description (1-2 sentences)"
                    className="textarea textarea-bordered text-base leading-relaxed"
                    rows={2}
                  />
                  <label className="label">
                    <span className="label-text-alt text-muted-foreground">
                      This appears in product listings and previews
                    </span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base">
                      Full Description
                    </span>
                  </label>
                  <textarea
                    name="description"
                    placeholder="Detailed description including ingredients, benefits, scent profile, and usage instructions"
                    className="textarea textarea-bordered text-base leading-relaxed"
                    rows={5}
                  />
                  <label className="label">
                    <span className="label-text-alt text-muted-foreground">
                      Include ingredients, benefits, and how to use
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory Section */}
          <div className="card bg-card border border-border shadow-sm">
            <div className="card-body p-8">
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold mb-6 pb-3 border-b border-border">
                Pricing & Inventory
              </h2>

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-base">
                        Regular Price ($) *
                      </span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      placeholder="12.99"
                      step="0.01"
                      min="0"
                      className="input input-bordered w-full text-base"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-base">
                        Stock Quantity *
                      </span>
                    </label>
                    <input
                      type="number"
                      name="stock_quantity"
                      placeholder="50"
                      min="0"
                      className="input input-bordered w-full text-base"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base">
                      Stock Status *
                    </span>
                  </label>
                  <select
                    name="stock_status"
                    className="select select-bordered w-full text-base"
                    required
                  >
                    <option value="instock">In Stock</option>
                    <option value="outofstock">Out of Stock</option>
                    <option value="onbackorder">On Backorder</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Categories & Images Section */}
          <div className="card bg-card border border-border shadow-sm">
            <div className="card-body p-8">
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold mb-6 pb-3 border-b border-border">
                Categories & Images
              </h2>

              <div className="space-y-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base">
                      Category *
                    </span>
                  </label>
                  <select
                    name="category"
                    className="select select-bordered w-full text-base"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="15">Uncategorized</option>
                    <option value="16">Bar Soaps</option>
                    <option value="17">Liquid Soaps</option>
                    <option value="18">Gift Sets</option>
                  </select>
                  <label className="label">
                    <span className="label-text-alt text-muted-foreground">
                      Choose the main category for this soap product
                    </span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base">
                      Product Image URL
                    </span>
                  </label>
                  <input
                    type="url"
                    name="image_url"
                    placeholder="https://example.com/soap-image.jpg"
                    className="input input-bordered w-full text-base"
                  />
                  <label className="label">
                    <span className="label-text-alt text-muted-foreground">
                      Enter the direct URL to your product image (JPG, PNG, or
                      WebP)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
            <button
              type="button"
              className="btn btn-ghost btn-lg"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-lg min-w-[200px]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating Product...
                </>
              ) : (
                <>
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create Product
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
