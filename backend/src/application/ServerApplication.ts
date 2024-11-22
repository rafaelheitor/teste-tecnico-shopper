import { NestExpressApplication } from "@nestjs/platform-express";
import { NestFactory } from "@nestjs/core";
import { RootModule } from "./di/.RootModule";
import { OpenAPIObject } from "@nestjs/swagger";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger/dist";
import helmet from "helmet";
import { config } from "@infrastructure/config/config";

export class ServerApplication {
  private readonly port: number =
    Number(config().ApiServerConfig.API_PORT || process.env.PORT) || 8080;

  public async run(): Promise<void> {
    const app: NestExpressApplication =
      await NestFactory.create<NestExpressApplication>(RootModule);

    app.use(helmet());
    app.enableCors({ origin: "*" });
    app.setGlobalPrefix("/api/v1");

    this.buildDocumentation(app);

    await app.listen(this.port);
  }

  private buildDocumentation(app: NestExpressApplication): void {
    const title: string = "Teste shopper backend";
    const description: string = "Test Shopper Backend documentation";
    const version: string = "1.0.0";

    const options: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addBearerAuth()
      .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup("documentation", app, document);
  }

  public static new(): ServerApplication {
    return new ServerApplication();
  }
}
