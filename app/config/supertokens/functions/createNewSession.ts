import { STCreateNewSessionInput } from "@/app/types";
import SessionNode from "supertokens-node/recipe/session";
import SuperTokens from "supertokens-node";
import UserMetadata from "supertokens-node/recipe/usermetadata";

export async function createNewSession(
  input: STCreateNewSessionInput,
  originalImplementation: SessionNode.RecipeInterface
) {
  try {
    if (input.userContext.isSignUp) {
      /**
       * The execution will come here only in case
       * a sign up API is calling this function. This is because
       * only then will the input.userContext.isSignUp === true
       * (see above code).
       */
      console.log(`\n\nAbout to create empty session\n\n`);
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
    }

    const session = await originalImplementation.createNewSession(input);

    const usermetadata = await UserMetadata.getUserMetadata(input.userId, input.userContext);

    await session.updateSessionDataInDatabase(usermetadata, input.userContext);

    return session;
  } catch (error) {
    console.error(`createNewSession error: `, error);
    throw error;
  }
}
