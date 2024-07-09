
import Hero from "@/components/home/Hero";
import ShopByCategory from "@/components/home/ShopByCategory";
import ProductsSlider from "@/components/home/ProductsSlider";
import HotDeals from "@/components/home/HotDeals";
import Newsletter from "@/components/home/Newsletter";
import { fetchProductsByBrand, fetchSortedProducts } from "@/server/actions/ProductActions";

export default async function Index() {
  const pageNumber = 1;
  const { data: bestSellingProducts } = await fetchSortedProducts('best-selling','None','None',pageNumber);
  const { data: deColoressProducts } = await fetchProductsByBrand("De Coloress", pageNumber);
  const { data: chelsyProducts } = await fetchProductsByBrand("Chelsy", pageNumber);
  const { data: herbonicaProducts } = await fetchProductsByBrand("Herbonica", pageNumber);

  return (
    <>
      <div className="w-full">
        {/* <Hero /> */}
        <ShopByCategory />
        <ProductsSlider title="Best Sellers" viewAll="/products" products={JSON.parse(JSON.stringify(bestSellingProducts))} />
        <ProductsSlider title="De Coloress" viewAll="/products/de-coloress" products={JSON.parse(JSON.stringify(deColoressProducts))} />
        <ProductsSlider title="Herbonica" viewAll="/products/herbonica" products={JSON.parse(JSON.stringify(herbonicaProducts))} />
        <ProductsSlider title="Chelsy" viewAll="/products/chelsy" products={JSON.parse(JSON.stringify(chelsyProducts))} />
        {/* <HotDeals /> */}
        <Newsletter />
      </div>
    </>
  );
}
