import { fetchProductForSitemap } from "@/server/actions/ProductActions";
import { MetadataRoute } from "next";

const baseUrl = "https://www.chelsycosmetics.com";
const productsCategory = [
  "chelsy",
  "de-colores",
  "herbonica",
  "nails",
  "face",
  "hair",
  "eye",
  "body",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const brandNCategory = productsCategory.map((category) => ({
    url: `${baseUrl}/products/${category}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const urls = await fetchProductForSitemap();

  const products = urls.map((url: string) => ({
    url: `${baseUrl}/${url}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...brandNCategory,
    ...products,
    {
      url: `${baseUrl}/our-story`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
