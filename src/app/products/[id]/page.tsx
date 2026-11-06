import type { Metadata } from "next";
import { getProduct, getRelatedProducts } from "@/data/productData";
import ProductDetailView from "./ProductDetailView";

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams?.id || "1";
  const product = getProduct(id);

  return {
    title: `${product.title} | Premium Fitness Equipment & Coaching`,
    description: product.shortDescription,
    openGraph: {
      title: product.title,
      description: product.shortDescription,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams?.id || "1";
  const product = getProduct(id);
  const relatedProducts = getRelatedProducts(product.relatedProductIds);

  return <ProductDetailView product={product} relatedProducts={relatedProducts} />;
}
