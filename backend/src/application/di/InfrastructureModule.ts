import { NestHttpExceptionFilter } from "@application/http-rest/exception-filter/NestHttpExceptionFilter";
import { NestHttpLoggingInterceptor } from "@application/http-rest/interceptor/NestHttpLoggingInterceptor";
import { InfrastructureDITokens } from "@core/common/di/InfrastructureDITokens";
import { AxiosHttpClient } from "@infrastructure/adapter/HttpClient/AxiosHttpClient";
import { PrismaService } from "@infrastructure/adapter/ORM/PrismaService";

import { Global, Module, Provider } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";

const providers: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: NestHttpExceptionFilter,
  },

  {
    provide: APP_INTERCEPTOR,
    useClass: NestHttpLoggingInterceptor,
  },
  {
    provide: InfrastructureDITokens.HttpClient,
    useClass: AxiosHttpClient,
  },
  {
    provide: InfrastructureDITokens.PrismaClient,
    useClass: PrismaService,
  },
];

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "env/production.env",
    }),
  ],
  providers: [...providers],
  exports: [
    InfrastructureDITokens.HttpClient,
    InfrastructureDITokens.PrismaClient,
  ],
})
export class InfrastructureModule {}
