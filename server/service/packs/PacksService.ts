import { Repository } from "@/server/service/repository/RepositoryService";
import { IPacksService } from "./IPacksService";
import { IPacks } from "@/types/product";

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
}
