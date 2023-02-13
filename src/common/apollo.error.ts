import { ApolloError } from "apollo-server";

export class NotFoundError extends ApolloError {
  constructor(message: string, properties?: Record<string, any>) {
    super(message, "NOT_FOUND", properties);

    Object.defineProperty(this, "name", { value: "NotFoundError" });
  }
}
