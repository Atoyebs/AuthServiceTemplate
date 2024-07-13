import EmailPasswordNode from "supertokens-node/recipe/emailpassword";
import EmailVerification from "supertokens-node/recipe/emailverification";
import SessionNode from "supertokens-node/recipe/session";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import { appInfo } from "../appInfo";
import { TypeInput } from "supertokens-node/types";
import SuperTokens from "supertokens-node";
import { signUpPOST, signInFunction, sendVerificationEmail, createNewSession } from "./functions";

const connectionURI = `${process.env.NEXT_SERVER_SUPERTOKENS_CONNECTION_URI!}`;

export let backendConfig = (): TypeInput => {
  return {
    supertokens: {
      // this is the location of the SuperTokens core.
      connectionURI,
    },
    appInfo,
    // recipeList contains all the modules that you want to
    // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
    recipeList: [
      EmailPasswordNode.init({
        override: {
          apis: (originalImplementation) => {
            return {
              ...originalImplementation,
              //customize sign up functionality here
              signUpPOST: (input) => signUpPOST(input, originalImplementation),
            };
          },
          functions: (originalImplementation) => {
            return {
              ...originalImplementation,
              signUp(input) {
                input.userContext.isSignUp = true;
                return originalImplementation.signUp(input);
              },
              //customize sign in functionality here
              signIn: (input) => signInFunction(input, originalImplementation),
            };
          },
        },
        signUpFeature: {
          formFields: [
            {
              id: "firstname",
            },
            {
              id: "lastname",
            },
            {
              id: "email",
            },
            {
              id: "password",
            },
          ],
        },
      }),
      SessionNode.init({
        override: {
          functions: (originalImplementation) => {
            return {
              ...originalImplementation,
              createNewSession: (input) => createNewSession(input, originalImplementation),
            };
          },
        },
      }),
      Dashboard.init(),
      UserRoles.init(),
      UserMetadata.init(),
      EmailVerification.init({
        mode: "REQUIRED",
        emailDelivery: {
          override(originalImplementation) {
            return {
              ...originalImplementation,
              sendEmail: (input) => sendVerificationEmail(originalImplementation, input),
            };
          },
        },
      }),
    ],
    isInServerlessEnv: true,
    framework: "custom",
  };
};

let initialized = false;
export function ensureSuperTokensInit() {
  if (!initialized) {
    SuperTokens.init(backendConfig());
    initialized = true;
  }
}
