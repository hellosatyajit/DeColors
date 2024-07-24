"use server";

import { ObjectId } from "mongodb";
import { ICartItem } from "../model/transaction";
import { PacksService } from "../service/packs/PacksService";
import { ProductService } from "../service/product/ProductService";
import { notFound } from "next/navigation";

const limit = 1000;

export const fetchProducts = async (pageNumber: number = 1) => {
  const productService = new ProductService();
  const packsService = new PacksService();
  const products = await productService.searchProducts({}, pageNumber, limit);
  const packs = await packsService.searchProducts({}, pageNumber, limit);
  return {
    data: JSON.parse(JSON.stringify([...products.data, ...packs.data])),
  };
};
export const searchProductsAndPacks = async (
  searchTerm: string,
  pageNumber: number = 1
) => {
  const limit = 10;
  const productService = new ProductService();
  const packsService = new PacksService();

  const products = await productService.searchByText(searchTerm, pageNumber, limit);
  const packs = await packsService.searchByText(searchTerm, pageNumber, limit);

  return {
    data: JSON.parse(JSON.stringify([...products.data, ...packs.data])),
  };
};

export const fetchProductBySlug = async (
  slug: string,
  pageNumber: number = 1
) => {
  const productService = new ProductService();

  const products = await productService.searchProducts(
    { slug: slug },
    pageNumber,
    limit
  );

  if (products.data.length === 0) {
    notFound();
  }

  return JSON.parse(JSON.stringify(products.data[0]));
};

export const fetchPackBySlug = async (slug: string, pageNumber: number = 1) => {
  const packsService = new PacksService();

  const products = await packsService.searchProducts(
    { slug: slug },
    pageNumber,
    limit
  );

  if (products.data.length === 0) {
    notFound();
  }

  return JSON.parse(JSON.stringify(products.data[0]));
};

export const fetchProductsByBrand = async (
  brandName: string,
  pageNumber: number = 1
) => {
  const productService = new ProductService();
  const packsService = new PacksService();

  const products = await productService.searchProducts(
    { brand: brandName },
    pageNumber,
    limit
  );

  const packs = await packsService.searchProducts(
    { brand: brandName },
    pageNumber,
    limit
  );

  return {
    data: JSON.parse(JSON.stringify([...products.data, ...packs.data])),
  };
};
export const fetchProductsByCategory = async (
  categoryName: string,
  pageNumber: number = 1
) => {
  const productService = new ProductService();
  const packsService = new PacksService();

  const products = await productService.searchProducts(
    { category: categoryName },
    pageNumber,
    limit
  );

  const packs = await packsService.searchProducts(
    { category: categoryName },
    pageNumber,
    limit
  );

  return {
    data: JSON.parse(JSON.stringify([...products.data, ...packs.data])),
  };
};
export const fetchSortedProducts = async (
  sortingOption: string,
  categoryOrBrand: string = "None",
  field: "category" | "brand" | "None" = "None",
  pageNumber: number = 1
) => {
  const productService = new ProductService();
  const packsService = new PacksService();

  const searchOptions = field === "None" ? {} : { [field]: categoryOrBrand };

  const products = await productService.searchProducts(
    searchOptions,
    pageNumber,
    limit
  );

  const packs = await packsService.searchProducts(
    searchOptions,
    pageNumber,
    limit
  );

  const allProducts = [...products.data, ...packs.data];

  let sortedProducts = [];

  switch (sortingOption) {
    case "best-selling":
      sortedProducts = allProducts.sort((a, b) => b.soldCount - a.soldCount);
      break;
    case "newest":
      sortedProducts = allProducts.sort(
          (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
        );
        break;
    case "price-ascending":
      sortedProducts = allProducts.sort((a, b) => a.price.mrp - b.price.mrp);
      break;
    case "price-descending":
      sortedProducts = allProducts.sort((a, b) => b.price.mrp - a.price.mrp);
      break;
    case "alphabet-ascending":
      sortedProducts = allProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "alphabet-descending":
      sortedProducts = allProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      sortedProducts = allProducts;
  }

  return {
    data: JSON.parse(JSON.stringify(sortedProducts)),
  };
};
export const fetchSuggestedProducts = async (
  brand: string | null,
  category: string | null,
  pageNumber: number = 1
) => {
  const limit = 10;
  const productService = new ProductService();
  const packsService = new PacksService();

  let searchOptions: any = {};

  if (brand) {
    searchOptions.brand = brand;
  }

  if (category) {
    searchOptions.category = category;
  }

  const products = await productService.searchProducts(
    searchOptions,
    pageNumber,
    limit
  );

  const packs = await packsService.searchProducts(
    searchOptions,
    pageNumber,
    limit
  );

  return {
    data: JSON.parse(JSON.stringify([...products.data, ...packs.data])),
  };
};
export const addReviewToProductOrPack = async (
  id: string,
  review: {
    name: string;
    rating: number;
    review: string;
    date: Date;
  },
  isProduct: boolean = true
) => {
  if (isProduct) {
    const productService = new ProductService();
    return await productService.addReview(id, review);
  } else {
    const packsService = new PacksService();
    return await packsService.addReview(id, review);
  }
};
export const incrementSoldCount = async (cartItems: any[]) => {
  const productService = new ProductService();
  const packsService = new PacksService();

  for (const item of cartItems) {
    let { id, quantity } = item;
    let sku: string = "";

    if (id.includes("-")) {
      const parts = id.split("-");
      id = parts.shift() as string;
      sku = parts.join("-");
    }
    let product = await productService.searchProducts(
      { _id: new ObjectId(id) },
      1,
      1
    );
    if (product.totalCount > 0) {
      // Product found
      const productId = product.data[0]._id;
      const productSoldCount = product.data[0].soldCount;
      const variant = product.data[0].variants.find((v: any) => v.sku === sku);
      const variantInventory = variant?.inventory;
      await productService.incrementSoldCount(
        productId.toString(),
        productSoldCount,
        sku,
        variantInventory,
        quantity
      );
    } else {
      // Check in packs
      let pack = await packsService.searchProducts(
        { _id: new ObjectId(id) },
        1,
        1
      );
      if (pack.totalCount > 0) {
        // Pack found
        const packId = pack.data[0]._id;
        const packSoldCount = pack.data[0].soldCount;
        const packinventory = pack.data[0].inventory;
        await packsService.incrementSoldCount(
          packId.toString(),
          packSoldCount,
          packinventory,
          quantity
        );
      } else {
        throw new Error(`Product or Pack with slug ${id} not found`);
      }
    }
  }
};
