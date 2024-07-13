import EmailPasswordNode from "supertokens-node/recipe/emailpassword";
import { FormFields, STLoginFunctionInput, STSignUpPOSTInput } from "@/app/types";
import { arrayToObjectWithKeys } from "../../../utility";
import { updateUserContext } from "../../utils";

export async function signInFunction(
  input: STLoginFunctionInput,
  originalImplementation: EmailPasswordNode.RecipeInterface
) {
  try {
    const response = await originalImplementation.signIn(input);
    input.userContext.isSignUp = false;

    return response;
  } catch (error) {
    console.error(`login error: `, error);
    throw error;
  }
}
