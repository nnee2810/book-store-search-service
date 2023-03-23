import { Global, Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { ElasticsearchModule } from "@nestjs/elasticsearch"
import { EnvPayload } from "src/interfaces/env-payload.interface"

@Global()
@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvPayload>) => ({
        node: configService.get("ES_URL"),
        auth: {
          username: configService.get("ES_USERNAME"),
          password: configService.get("ES_PASSWORD"),
        },
      }),
    }),
  ],
  exports: [ElasticsearchModule],
})
export class EsModule {}
