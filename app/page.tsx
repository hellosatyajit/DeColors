import Hero from "@/components/home/Hero";
import ShopByCategory from "@/components/home/ShopByCategory";
import BestSellers from "@/components/home/BestSellers";
import HotDeals from "@/components/home/HotDeals";
import Newsletter from "@/components/home/Newsletter";

export default async function Index() {
  return (
    <div className="w-full">
      <Hero />
      <ShopByCategory />
      <BestSellers />
      <HotDeals />
      <Newsletter />
    </div>
  );
}
