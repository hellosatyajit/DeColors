import { IPacks } from "@/types/product";

export interface IPacksService {
  searchProducts(
    filter: Partial<IPacks>
  ): Promise<{ data: IPacks[]; totalCount: number }>;
}
