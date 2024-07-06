"use server";

import { PacksService } from "../service/packs/PacksService";
import { ProductService } from "../service/product/ProductService";

const limit = 1000;

export const fetchProducts = async (pageNumber: number=1) => {
  const productService = new ProductService();
  const packsService = new PacksService();
  const products = await productService.searchProducts({}, pageNumber, limit);
  const packs = await packsService.searchProducts({},pageNumber,limit)
  return {
    data: [...products.data, ...packs.data],
  };
};

export const fetchProductBySlug = async (slug: string, pageNumber: number = 1) => {
  const productService = new ProductService();

  const products = await productService.searchProducts(
    { slug: slug },
    pageNumber,
    limit
  );

  return products.data[0];
}

export const fetchPackBySlug = async (slug: string, pageNumber: number = 1) => {
  const packsService = new PacksService();

  const products = await packsService.searchProducts(
    { slug: slug },
    pageNumber,
    limit
  );

  return products.data[0];
}

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
    data: [...products.data, ...packs.data],
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
    data: [...products.data, ...packs.data],
  };
};
export const fetchSortedProducts = async (
  sortingOption: string,
  categoryOrBrand: string = "None",
  field: 'category' | 'brand' | 'None' = "None",
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

  switch (sortingOption) {
    case "best-selling":
      return {data: allProducts.sort((a, b) => b.soldCount - a.soldCount)};
    case "newest":
      return {data:allProducts.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())};
    case "price-ascending":
      return {data: allProducts.sort((a, b) => a.price.mrp - b.price.mrp)};
    case "price-descending":
      return {data: allProducts.sort((a, b) => b.price.mrp - a.price.mrp)};
    case "alphabet-ascending":
      return {data: allProducts.sort((a, b) => a.name.localeCompare(b.name))};
    case "alphabet-descending":
      return {data: allProducts.sort((a, b) => b.name.localeCompare(a.name))};
    default:
      return {data:allProducts};
  }
};
export const addReviewToProductOrPack = async (
  name: string,
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
    return await productService.addReview(name, review);
  } else {
    const packsService = new PacksService();
    return await packsService.addReview(name, review);
  }
};