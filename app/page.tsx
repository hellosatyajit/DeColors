import Hero from "@/components/home/Hero";
import ShopByCategory from "@/components/home/ShopByCategory";
import BestSellers from "@/components/home/BestSellers";

export default async function Index() {
  return (
    <div className="w-full">
      <Hero />
      <ShopByCategory />
      <BestSellers />
    </div>
  );
}
