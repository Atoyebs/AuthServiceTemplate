import SessionNode from "supertokens-node/recipe/session";
import EmailPasswordNode from "supertokens-node/recipe/emailpassword";
import { UserContext } from "supertokens-node/types";
import SuperTokens from "supertokens-node";

export interface STSignUpPOSTInput {
  formFields: {
    id: string;
    value: string;
  }[];
  tenantId: string;
  session: SessionNode.SessionContainer | undefined;
  options: EmailPasswordNode.APIOptions;
  userContext: UserContext;
}

export interface STLoginFunctionInput {
  email: string;
  password: string;
  session: SessionNode.SessionContainer | undefined;
  tenantId: string;
  userContext: UserContext;
}

export interface STCreateNewSessionInput {
  userId: string;
  recipeUserId: SuperTokens.RecipeUserId;
  accessTokenPayload?: any;
  sessionDataInDatabase?: any;
  disableAntiCsrf?: boolean;
  tenantId: string;
  userContext: UserContext;
}

export type ServerComponentProps = {
  searchParams: Record<string, string>;
};

export type FormFields = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  username?: string;
};