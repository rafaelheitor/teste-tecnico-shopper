export interface Usecase<TUsecasePort, TUsecaseResult> {
  execute(port?: TUsecasePort): TUsecaseResult;
}
