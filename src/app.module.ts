import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import * as Joi from "joi"
import { EnvPayload } from "./interfaces/env-payload.interface"
import { ElasticModule } from "./modules/elastic/elastic.module"
import { ProductsModule } from "./modules/products/products.module"
import { RmqModule } from "./modules/rmq/rmq.module"
import { UsersModule } from "./modules/users/users.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object<EnvPayload, true>({
        ELASTICSEARCH_HOST: Joi.string().required(),
        ELASTICSEARCH_PORT: Joi.number().required(),
        ELASTICSEARCH_URL: Joi.string().required(),
        ELASTICSEARCH_USERNAME: Joi.string().required(),
        ELASTICSEARCH_PASSWORD: Joi.string().required(),

        RABBITMQ_DEFAULT_USER: Joi.string().required(),
        RABBITMQ_DEFAULT_PASS: Joi.string().required(),
        RABBITMQ_HOST: Joi.string().required(),
        RABBITMQ_PORT: Joi.number().required(),
        RABBITMQ_URL: Joi.string().required(),
      }),
    }),
    RmqModule,
    ElasticModule,
    ProductsModule,
    UsersModule,
  ],
})
export class AppModule {}
