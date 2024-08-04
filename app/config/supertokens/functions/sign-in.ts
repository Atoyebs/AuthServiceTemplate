import EmailPasswordNode from "supertokens-node/recipe/emailpassword";
import { STLoginFunctionInput } from "@/app/types";

export async function signInFunction(
  input: STLoginFunctionInput,
  originalImplementation: EmailPasswordNode.RecipeInterface
) {
  try {
    const response = await originalImplementation.signIn(input);
    input.userContext.isSignUp = false;

    console.log("response in signInFunction ==> ", response);
    input.userContext.email = input.email;

    return response;
  } catch (error) {
    console.error(`login error: `, error);
    throw error;
  }
}
