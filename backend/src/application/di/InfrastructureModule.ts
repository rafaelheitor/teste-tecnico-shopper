import { NestHttpExceptionFilter } from "@application/http-rest/exception-filter/NestHttpExceptionFilter";
import { NestHttpLoggingInterceptor } from "@application/http-rest/interceptor/NestHttpLoggingInterceptor";

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
})
export class InfrastructureModule {}
