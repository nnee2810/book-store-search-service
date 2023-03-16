import { Injectable } from "@nestjs/common"
import { ElasticsearchService } from "@nestjs/elasticsearch"
import { UserDocument } from "src/interfaces/documents/user-document.interface"

@Injectable()
export class UsersService {
  private index = "users"
  constructor(private elasticsearchService: ElasticsearchService) {}

  createIndex(data: UserDocument) {
    return this.elasticsearchService.index<UserDocument>({
      index: this.index,
      document: data,
    })
  }

  async search(name: string) {
    const { hits } = await this.elasticsearchService.search<UserDocument>({
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

  updateIndex({ id, name }: UserDocument) {
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
