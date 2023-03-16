import { Controller } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { UserDocument } from "src/interfaces/documents/user-document.interface"
import { UsersService } from "./users.service"

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @MessagePattern("create-user-index")
  createUserIndex(@Payload() data: UserDocument) {
    return this.usersService.createIndex(data)
  }

  @MessagePattern("search-user")
  searchUser(@Payload() name: string) {
    return this.usersService.search(name)
  }

  @MessagePattern("update-user-index")
  updateUserIndex(@Payload() data: UserDocument) {
    return this.usersService.updateIndex(data)
  }

  @MessagePattern("delete-user-index")
  deleteUserIndex(@Payload() id: string) {
    return this.usersService.deleteIndex(id)
  }
}
