import { Repository } from "@/server/service/repository/RepositoryService";
import { IPacksService } from "./IPacksService";
import { IPacks } from "@/types/product";
import { Review } from "@/types/product";
export class PacksService implements IPacksService {
  private repository: Repository<IPacks>;

  constructor() {
    this.repository = new Repository<IPacks>("packs");
  }

  async searchProducts(
    filter: Partial<IPacks>,
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: IPacks[]; totalCount: number }> {
    return this.repository.find(filter, page, limit);
  }
  async addReview(
    packName: string,
    review: { name: string, rating: number, review: string, date: Date }
  ): Promise<IPacks> {
    const pack = await this.repository.findByName(packName);
    if (!pack) {
      throw new Error("Pack not found");
    }

    if (!pack.rating) {
      pack.rating = { reviews: [] };
    }

    await this.repository.updateByName(packName, {
      rating: {
        reviews: [...(pack.rating.reviews || []), review],
      },
    });

    return this.repository.findByName(packName) as Promise<IPacks>;
  }
}
