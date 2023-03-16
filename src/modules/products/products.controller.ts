import { Controller } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { ProductDocument } from "src/interfaces/documents/product-document.interface"
import { ProductsService } from "./products.service"

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern("create-product-index")
  createProductIndex(@Payload() data: ProductDocument) {
    return this.productsService.createIndex(data)
  }

  @MessagePattern("search-product")
  searchProduct(@Payload() name: string) {
    return this.productsService.search(name)
  }

  @MessagePattern("update-product-index")
  updateProductIndex(@Payload() data: ProductDocument) {
    return this.productsService.updateIndex(data)
  }

  @MessagePattern("delete-product-index")
  deleteProductIndex(@Payload() id: string) {
    return this.productsService.deleteIndex(id)
  }
}
