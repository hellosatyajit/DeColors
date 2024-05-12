// 'use client'
import Hero from "@/components/home/Hero";
import ShopByCategory from "@/components/home/ShopByCategory";
import ProductsSlider from "@/components/home/ProductsSlider";
import HotDeals from "@/components/home/HotDeals";
import Newsletter from "@/components/home/Newsletter";
import { getBestSellingProducts, getProductsByBrand } from "@/utils/store";

const limitProducts = true;

export default async function Index() {
  const bestSellingProducts = await getBestSellingProducts(limitProducts);
  const deColoressProducts = await getProductsByBrand("De Coloress", limitProducts);
  const chelsyProducts = await getProductsByBrand("Chelsy", limitProducts);
  const herbonicaProducts = await getProductsByBrand("Herbonica", limitProducts);
  
  return (
    <>
      <div className="w-full">
        <Hero />
        <ShopByCategory />
        <ProductsSlider title="Best Sellers" viewAll="/products" products={bestSellingProducts} />
        <ProductsSlider title="De Coloress" viewAll="/products/de-coloress" products={deColoressProducts} />
        <ProductsSlider title="Chelsy" viewAll="/products/chelsy" products={chelsyProducts} />
        <ProductsSlider title="Herbonica" viewAll="/products/herbonica" products={herbonicaProducts} />
        <HotDeals />
        <Newsletter />
      </div>
    </>
  );
}
