import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { TrendingProducts } from "@/components/home/TrendingProducts";
import { FadeIn } from "@/components/ui/FadeIn";
import products from "@/data/products.json";
import { Product } from "@/types";

export default function HomePage() {
  const typed = products as Product[];
  const trending = typed.slice(0, 8);

  return (
    <>
      <Hero />
      <FadeIn>
        <Categories />
      </FadeIn>
      <FadeIn delay={0.2}>
        <TrendingProducts products={trending} />
      </FadeIn>
    </>
  );
}