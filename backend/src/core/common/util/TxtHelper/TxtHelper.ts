import * as fsPromise from "fs/promises";

export class TxtHelper {
  static async writeLogMessageOnFile(message: string) {
    await fsPromise.appendFile("dist/log.txt", message);
  }
}
