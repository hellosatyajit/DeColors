import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

const fetchProducts = async (pageNumber: number = 1) => {
  const response = await axios.post(`${API_BASE_URL}/products`, { pageNumber });
  return response.data;
};

const fetchPacks = async (pageNumber: number = 1) => {
  const response = await axios.post(`${API_BASE_URL}/packs`, { pageNumber });
  return response.data;
};

const searchProductsAndPacks = async (searchTerm: string, pageNumber: number = 1) => {
  const response = await axios.post(`${API_BASE_URL}/search`, { searchTerm, pageNumber });
  return response.data;
};

const fetchProductBySlug = async (slug: string) => {
  const response = await axios.post(`${API_BASE_URL}/product`, { slug });
  return response.data;
};

const fetchPackBySlug = async (slug: string) => {
  const response = await axios.post(`${API_BASE_URL}/pack`, { slug });
  return response.data;
};

const fetchProductsByBrand = async (brandName: string, pageNumber: number = 1) => {
  const response = await axios.post(`${API_BASE_URL}/products/brand`, { brandName, pageNumber });
  return response.data;
};

const fetchProductsByCategory = async (categoryName: string, pageNumber: number = 1) => {
  const response = await axios.post(`${API_BASE_URL}/products/category`, { categoryName, pageNumber });
  return response.data;
};

const fetchSortedProducts = async (sortingOption: string, categoryOrBrand: string = "None", field: string = "None", pageNumber: number = 1) => {
  const response = await axios.post(`${API_BASE_URL}/products/sorted`, { sortingOption, categoryOrBrand, field, pageNumber });
  return response.data;
};

const fetchSuggestedProducts = async (brand: string | null = null, category: string | null = null, pageNumber: number = 1) => {
  const response = await axios.post(`${API_BASE_URL}/products/suggested`, { brand, category, pageNumber });
  return response.data;
};

const addReviewToProductOrPack = async (id: string, review: any, isProduct: boolean = true) => {
  const response = await axios.post(`${API_BASE_URL}/review`, { id, review, isProduct });
  return response.data;
};

const incrementSoldCount = async (cartItems: any[]) => {
  const response = await axios.post(`${API_BASE_URL}/increment-sold-count`, { cartItems });
  return response.data;
};

const getVariantsAndQuantitiesFromPackId = async (packId: string) => {
  const response = await axios.post(`${API_BASE_URL}/pack/variants`, { packId });
  return response.data;
};

const fetchHeroImages = async() => {
  const response = await axios.post(`${API_BASE_URL}/hero`);
  return response.data
}
export {
  fetchProducts,
  fetchPacks,
  searchProductsAndPacks,
  fetchProductBySlug,
  fetchPackBySlug,
  fetchProductsByBrand,
  fetchProductsByCategory,
  fetchSortedProducts,
  fetchSuggestedProducts,
  addReviewToProductOrPack,
  incrementSoldCount,
  getVariantsAndQuantitiesFromPackId,
  fetchHeroImages,
};
