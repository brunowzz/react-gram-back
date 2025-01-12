import { Request as CoreRequest } from "express-serve-static-core";

declare module "express" {
  export interface Request extends CoreRequest {
    user?: any;
  }
}
