"use client";
import { useEffect, useState } from "react";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
// import RelatedProducts from "@/components/RelatedProducts";
import { getDiscountedPricePercentage } from "@/utils/helper";
import toast from "react-hot-toast";
import ProductsSlider from "@/components/home/ProductsSlider";
import { addToCart } from "@/utils/cart";
import { getProductBySlug } from "@/utils/store";
import { IProduct } from "@/types/product";
import { fetchPackBySlug } from "@/server/actions/ProductActions";

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

const imageData = [
  {
    id: "1",
    url: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/1.png",
    name: "",
  },
  {
    id: "2",
    url: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/2.png",
    name: "",
  },
  {
    id: "3",
    url: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/3.png",
    name: "",
  },
  {
    id: "4",
    url: "https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/4.png",
    name: "",
  },
];

const ProductDetails = (router: any) => {
  const [selectedSize, setSelectedColor] = useState("");
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const product: any = await fetchPackBySlug(router.params.slug);
      setProduct(product);
    }
    fetchData();
  }, [router.params.slug]);

  const notify = () => {
    toast.success("Success. Check your cart!");
  };

  const doAddToCart = () => {
    addToCart(product)
    notify();
  }

  return (
    <section className="w-full">
      <div className="max-w-7xl m-auto px-5 py-10 space-y-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-20">
          <ProductDetailsCarousel images={product?.images || imageData} />
          <div className="flex-[1] py-3">
            <div className="text-[34px] font-semibold mb-2 leading-tight">
              {product?.name}
            </div>

            <div className="text-lg font-semibold mb-5">{product?.subheading}</div>

            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">{product?.price.mrp - product?.price.discount} ₹</p>
              {149 && (
                <>
                  <p className="text-base  font-medium line-through">
                    {product?.price.mrp} ₹
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getDiscountedPricePercentage(product?.price.mrp, product?.price.mrp - product?.price.discount)}% off
                  </p>
                </>
              )}
            </div>

            <div className="text-md font-medium text-black/[0.5]">
              incl. of taxes
            </div>
            <div className="text-md font-medium text-black/[0.5] mb-20">
              {`(Also includes all applicable duties)`}
            </div>

            <div className="mb-10">
              <div className="flex justify-between mb-2 text-md font-semibold">
                Select Color
              </div>

              {/* <div id="sizesGrid" className="flex flex-wrap gap-2">
                {product?.variants.map(
                  (item: any, index: number) => (
                    <button
                      key={index}
                      className={`border rounded-full text-center py-3 font-medium w-10 h-10 cursor-pointer ${selectedSize === item.sku ? "border-black" : ""
                        }`}
                      style={{
                        backgroundColor: item.attribute.color,
                      }}
                      onClick={() => {
                        setSelectedColor(item.sku);
                        addQueryParam(item.sku)
                        setShowError(false);
                      }}
                    ></button>
                  )
                )}
              </div> */}
            </div>

            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-10 hover:opacity-75"
              onClick={doAddToCart}
            >
              Add to Cart
            </button>

            <div>
              <div className="text-lg font-bold mb-1">Product Details</div>
              <div className="markdown text-md mb-5">
                {
                  product?.description.map((item: any, index: number) => (
                    <p key={index}>{item}</p>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {/* <ProductsSlider title="You Might Also Like" viewAll="/products/herbonica" products={products} /> */}
      </div>
    </section>
  );
};

export default ProductDetails;
