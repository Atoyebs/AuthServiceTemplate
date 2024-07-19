import { UserContext } from "supertokens-node/types";
import { FormFields } from "../types";

export function updateUserContext(context: UserContext, data: FormFields | any) {
  return {
    ...context,
    ...data,
  };
}
