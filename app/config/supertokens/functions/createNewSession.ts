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
    console.log(`usermetadata = `, metadata);

    input.accessTokenPayload = {
      ...input.accessTokenPayload,
      ...metadata,
      email: input.userContext?.email || "",
    };

    console.log(`input accessTokenPayload = `, input.accessTokenPayload);

    const session = await originalImplementation.createNewSession(input);

    return session;
  } catch (error) {
    console.error(`createNewSession error: `, error);
    throw error;
  }
}
