import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import * as Joi from "joi"
import { EnvPayload } from "./interfaces/env-payload.interface"
import { EsModule } from "./modules/es/es.module"
import { ProductsModule } from "./modules/products/products.module"
import { RmqModule } from "./modules/rmq/rmq.module"
import { UsersModule } from "./modules/users/users.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object<EnvPayload, true>({
        ES_HOST: Joi.string().required(),
        ES_PORT: Joi.number().required(),
        ES_URL: Joi.string().required(),
        ES_USERNAME: Joi.string().required(),
        ES_PASSWORD: Joi.string().required(),

        RMQ_USER: Joi.string().required(),
        RMQ_PASS: Joi.string().required(),
        RMQ_HOST: Joi.string().required(),
        RMQ_PORT: Joi.number().required(),
        RMQ_URL: Joi.string().required(),
      }),
    }),
    RmqModule,
    EsModule,
    ProductsModule,
    UsersModule,
  ],
})
export class AppModule {}
