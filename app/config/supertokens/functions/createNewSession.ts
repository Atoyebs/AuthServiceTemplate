import { STCreateNewSessionInput } from "@/app/types";
import SessionNode from "supertokens-node/recipe/session";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import SuperTokens from "supertokens-node";

export async function createNewSession(
  input: STCreateNewSessionInput,
  originalImplementation: SessionNode.RecipeInterface
) {
  try {
    if (input.userContext.isSignUp) {
      return getEmptySession();
    }

    const usermetadata = await UserMetadata.getUserMetadata(input.userId, input.userContext);
    const metadata = { ...usermetadata.metadata };

    console.log("input in createNewSession ==> ", input);
    console.log("metadata in createNewSession ==> ", usermetadata);

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

const getEmptySession = () => {
  return {
    // this is an empty session. It won't result in a session being created for the user.
    getAccessToken: () => "",
    getAccessTokenPayload: () => null,
    getExpiry: async () => -1,
    getHandle: () => "",
    getSessionDataFromDatabase: async () => null,
    getTimeCreated: async () => -1,
    getUserId: () => "",
    revokeSession: async () => {},
    updateSessionDataInDatabase: async () => {},
    mergeIntoAccessTokenPayload: async () => {},
    assertClaims: async () => {},
    fetchAndSetClaim: async () => {},
    getClaimValue: async () => undefined,
    setClaimValue: async () => {},
    removeClaim: async () => {},
    attachToRequestResponse: () => {},
    getAllSessionTokensDangerously: () => ({
      accessAndFrontTokenUpdated: false,
      accessToken: "",
      frontToken: "",
      antiCsrfToken: undefined,
      refreshToken: undefined,
    }),
    getTenantId: () => "public",
    getRecipeUserId: () => SuperTokens.convertToRecipeUserId(""),
  };
};
