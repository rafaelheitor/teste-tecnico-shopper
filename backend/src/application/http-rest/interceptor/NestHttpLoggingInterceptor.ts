import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { Request } from "express";
import { tap } from "rxjs/operators";
import * as fsPromise from "fs/promises";

@Injectable()
export class NestHttpLoggingInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const request: Request = context.switchToHttp().getRequest();
    const requestStartDate: number = Date.now();

    return next.handle().pipe(
      tap((): void => {
        const requestFinishDate: number = Date.now();
        const date = new Date();

        const message: string =
          `Date: ${date.toISOString().split("T")[0]} ` +
          `Method: ${request.method}; ` +
          `Path: ${request.path}; ` +
          `Body: ${JSON.stringify(request.body)}; ` +
          `IP Address: ${request.ip}; ` +
          `HOST: ${request.hostname}; ` +
          `SpentTime: ${requestFinishDate - requestStartDate}ms\n`;

        if (request.path == "/api/v1/metrics") return;

        Logger.log(message, NestHttpLoggingInterceptor.name);
        Promise.resolve(fsPromise.appendFile("dist/log.txt", message));
      })
    );
  }
}
