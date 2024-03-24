"use client";
import { useState } from "react";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
// import RelatedProducts from "@/components/RelatedProducts";
import { getDiscountedPricePercentage } from "@/utils/helper";
import toast from "react-hot-toast";
import ProductsSlider from "@/components/home/ProductsSlider";

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

const ProductDetails = () => {
  const [selectedSize, setSelectedColor] = useState("");
  const [showError, setShowError] = useState(false);

  const notify = () => {
    toast.success("Success. Check your cart!");
  };

  return (
    <section className="w-full">
      <div className="max-w-7xl m-auto px-5 py-10 space-y-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-20">
            <ProductDetailsCarousel images={imageData} />
          <div className="flex-[1] py-3">
            <div className="text-[34px] font-semibold mb-2 leading-tight">
              Product Name
            </div>

            <div className="text-lg font-semibold mb-5">Product Subtitle</div>

            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">MRP : &#8377;{149}</p>
              {149 && (
                <>
                  <p className="text-base  font-medium line-through">
                    &#8377;149
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getDiscountedPricePercentage(149, 99)}% off
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

              <div id="sizesGrid" className="flex gap-2">
                {["#FF5733", "#42A5F5", "#FFEB3B", "#4CAF50", "#9C27B0"].map(
                  (item: string, index: number) => (
                    <div
                      key={index}
                      className={`border rounded-full text-center py-3 font-medium w-10 h-10 cursor-pointer ${
                        selectedSize === item ? "border-black" : ""
                      }`}
                      style={{
                        backgroundColor: item,
                      }}
                      onClick={() => {
                        setSelectedColor(item);
                        setShowError(false);
                      }}
                    ></div>
                  )
                )}
              </div>

              {showError && (
                <div className="text-red-600 mt-1">
                  Size selection is required
                </div>
              )}
            </div>

            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-10 hover:opacity-75"
              onClick={notify}
            >
              Add to Cart
            </button>

            <div>
              <div className="text-lg font-bold mb-5">Product Details</div>
              <div className="markdown text-md mb-5">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe
                voluptatum sint quam quisquam, exercitationem impedit iure
                voluptatibus distinctio totam? Nisi aperiam fugiat quo dolores
                nihil fuga esse hic explicabo illo nesciunt ex illum eius
                praesentium tempore, odit ratione debitis iusto quod molestiae
                neque. Molestias eius explicabo quaerat saepe quidem id!
              </div>
            </div>
          </div>
        </div>
        <ProductsSlider title="You Might Also Like" viewAll="/products/herbonica" products={products} />
      </div>
    </section>
  );
};

export default ProductDetails;
