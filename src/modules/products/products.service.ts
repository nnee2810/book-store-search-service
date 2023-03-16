import { Injectable } from "@nestjs/common"
import { ElasticsearchService } from "@nestjs/elasticsearch"
import { ProductDocument } from "src/interfaces/documents/product-document.interface"

@Injectable()
export class ProductsService {
  private index = "products"
  constructor(private elasticsearchService: ElasticsearchService) {}

  createIndex(data: ProductDocument) {
    return this.elasticsearchService.index<ProductDocument>({
      index: this.index,
      document: data,
    })
  }

  async search(name: string) {
    const { hits } = await this.elasticsearchService.search<ProductDocument>({
      index: this.index,
      query: {
        match: {
          name: {
            query: name,
            fuzziness: "AUTO",
          },
        },
      },
    })
    return hits.hits.map((hit) => hit._source)
  }

  updateIndex({ id, name }: ProductDocument) {
    return this.elasticsearchService.updateByQuery({
      index: this.index,
      query: {
        match: {
          id,
        },
      },
      script: {
        source: `ctx._source.name='${name}'`,
      },
    })
  }

  deleteIndex(id: string) {
    return this.elasticsearchService.deleteByQuery({
      index: this.index,
      query: {
        match: {
          id,
        },
      },
    })
  }
}
