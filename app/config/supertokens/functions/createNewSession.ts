import { STCreateNewSessionInput } from "@/app/types";
import SessionNode from "supertokens-node/recipe/session";
import SuperTokens from "supertokens-node";
import UserMetadata from "supertokens-node/recipe/usermetadata";

export async function createNewSession(
  input: STCreateNewSessionInput,
  originalImplementation: SessionNode.RecipeInterface
) {
  try {
    const usermetadata = await UserMetadata.getUserMetadata(input.userId, input.userContext);
    const metadata = { ...usermetadata.metadata };

    console.log("input in createNewSession ==> ", input);

    //TODO: make sure email is being passed into access token payload
    input.accessTokenPayload = {
      ...input.accessTokenPayload,
      ...metadata,
      email: input.userContext.email || "",
      userId: input.userId,
    };

    const session = await originalImplementation.createNewSession(input);

    return session;
  } catch (error) {
    console.error(`createNewSession error: `, error);
    throw error;
  }
}
