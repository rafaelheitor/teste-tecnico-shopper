import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";
import { CoreErrorResponse } from "@core/common/api/CoreErrorResponse";
import { Code, CodeDescription } from "@core/common/code/Code";
import { Exception } from "@core/common/exception/Exception";
import { NestHttpLoggingInterceptor } from "../interceptor/NestHttpLoggingInterceptor";
import * as fsPromise from "fs/promises";

@Catch()
export class NestHttpExceptionFilter implements ExceptionFilter {
  public catch(error: Error, host: ArgumentsHost) {
    const request: Request = host.switchToHttp().getRequest();
    const response: Response = host.switchToHttp().getResponse<Response>();

    let errorResponse = this.createErrorResponse({
      code: Code.INTERNAL_ERROR.code,
      message: error.message,
      error_code: Code.INTERNAL_ERROR.error_code,
    });

    const date = new Date();
    const message: string =
      `Date: ${date.toISOString().split("T")[0]} ` +
      `Method: ${request.method}; ` +
      `Path: ${request.path}; ` +
      `Error: ${errorResponse.error_description}\n`;

    Logger.log(message, NestHttpLoggingInterceptor.name);
    Promise.resolve(fsPromise.appendFile("dist/log.txt", message));

    errorResponse = this.handleNestError(error, errorResponse);
    errorResponse = this.handleCoreException(error, errorResponse);

    const statusCode = this.getHttpStatusCode(error);

    response.status(statusCode).json(errorResponse);
  }

  private handleNestError(
    error: Error,
    errorResponse: CoreErrorResponse
  ): CoreErrorResponse {
    if (error instanceof HttpException) {
      return this.createErrorResponse({
        code: error.getStatus(),
        message: error.message,
        error_code: "HTTP_ERROR",
      });
    }

    return errorResponse;
  }

  private handleCoreException(
    error: Error,
    errorResponse: CoreErrorResponse
  ): CoreErrorResponse {
    if (error instanceof Exception) {
      return this.createErrorResponse({
        code: error.code,
        message: error.message,
        error_code: error.error_code,
      });
    }

    return errorResponse;
  }

  private createErrorResponse(
    codeDescription: CodeDescription
  ): CoreErrorResponse {
    return CoreErrorResponse.create({
      code: codeDescription,
      errorCode: codeDescription.error_code,
    });
  }

  private getHttpStatusCode(error: Error): number {
    if (error instanceof HttpException) {
      return error.getStatus();
    }

    if (error instanceof Exception) {
      return error.code || 500;
    }

    return 500;
  }
}
