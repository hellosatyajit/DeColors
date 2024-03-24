import Hero from "@/components/home/Hero";
import ShopByCategory from "@/components/home/ShopByCategory";
import ProductsSlider from "@/components/home/ProductsSlider";
import HotDeals from "@/components/home/HotDeals";
import Newsletter from "@/components/home/Newsletter";

const products = [
  {
    name: "Product Name",
    description: "Product Description",
    price: 99,
    discount: 149,
    image: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/1.png",
    url: "/product/1"
  },
  {
    name: "Product Name",
    description: "Product Description",
    price: 99,
    discount: 149,
    image: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/2.png",
    url: "/product/2"
  },
  {
    name: "Product Name",
    description: "Product Description",
    price: 99,
    discount: 149,
    image: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/3.png",
    url: "/product/3"
  },
  {
    name: "Product Name",
    description: "Product Description",
    price: 99,
    discount: 149,
    image: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/4.png",
    url: "/product/4"
  },
  {
    name: "Product Name",
    description: "Product Description",
    price: 99,
    discount: 149,
    image: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/5.png",
    url: "/product/5"
  },
];

export default async function Index() {
  return (
    <>
      <div className="w-full">
        <Hero />
        <ShopByCategory />
        <ProductsSlider title="Best Sellers" viewAll="/products" products={products} />
        <ProductsSlider title="De Coloress" viewAll="/products/de-coloress" products={products} />
        <ProductsSlider title="Chelsy" viewAll="/products/chelsy" products={products} />
        <ProductsSlider title="Herbonica" viewAll="/products/herbonica" products={products} />
        <HotDeals />
        <Newsletter />
      </div>
    </>
  );
}
