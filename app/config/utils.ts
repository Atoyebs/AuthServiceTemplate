import { UserContext } from "supertokens-node/types";
import { FormFields } from "../types";

export function updateUserContext(context: UserContext, data: FormFields | any) {
  return {
    ...context,
    ...data,
  };
}

const allowedHeaders = "http://localhost:3000, http://localhost:3005,  http://dev.kasefile.com";

const getAllowedOrigin = (originToVerify: string) => {
  const allowedHeaders = process.env.NEXT_SERVER_CORS_ALLOWED_ORIGINS!;
  if (!allowedHeaders || allowedHeaders.length < 2) {
    throw new Error("NEXT_SERVER_CORS_ALLOWED_ORIGINS is not set correctly OR is empty");
  }

  const headers = allowedHeaders.split(",");

  const idx = headers.findIndex((url) => {
    return url.trim() === originToVerify;
  });

  //if origin is not found, return default origin
  if (idx < 0) {
    return process.env.NEXT_SERVER_DEFAULT_ORIGIN!;
  }

  return originToVerify;
};
