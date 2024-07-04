"use server";

import { ProductService } from "../service/product/ProductService";
import { PacksService } from "../service/packs/PacksService";

const limit = 1000;

export const fetchProducts = async (pageNumber: number) => {
  const productService = new ProductService();
  return await productService.searchProducts({}, pageNumber, limit);
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

export const fetchBestSellingProducts = async (pageNumber: number = 1) => {
  const productService = new ProductService();
  const packsService = new PacksService();

  const products = await productService.searchProducts(
    {},
    pageNumber,
    limit
  );

  const packs = await packsService.searchProducts(
    {},
    pageNumber,
    limit
  );  

  return {
    data: [...products.data, ...packs.data].sort((a, b) => a.soldCount - b.soldCount)
  };
};
