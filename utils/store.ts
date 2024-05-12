// 'use client';
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    throw error;
  }

  return data;
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug);

  if (error) {
    throw error;
  }

  return data;
}

export async function getProductsByCategory(category: string, limit: boolean) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .limit(limit ? 10 : 1000);

  if (error) {
    throw error;
  }
  
  return data;
}

export async function getProductsByBrand(brand: string, limit: boolean) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("brand", brand)
    .limit(limit ? 10 : 1000);

  if (error) {
    throw error;
  }

  return data;
}

export async function getBestSellingProducts(limit: boolean) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order('sold_count', { ascending: true })
    .limit(limit ? 10 : 1000);

  if (error) {
    throw error;
  }
  
  return data;
}
