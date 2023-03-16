import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { MicroserviceOptions } from "@nestjs/microservices"
import { AppModule } from "./app.module"
import { EnvPayload } from "./interfaces/env-payload.interface"
import { RmqService } from "./modules/rmq/rmq.service"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService: ConfigService<EnvPayload> = app.get(ConfigService)
  const rmqService = app.get(RmqService)

  app.connectMicroservice<MicroserviceOptions>(
    rmqService.getOptions("SEARCH_SERVICE"),
  )
  await app.startAllMicroservices()
}
bootstrap()
