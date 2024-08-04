import EmailPasswordNode from "supertokens-node/recipe/emailpassword";
import EmailVerification from "supertokens-node/recipe/emailverification";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import { FormFields, STSignUpPOSTInput } from "@/app/types";
import { arrayToObjectWithKeys } from "../../../utility";
import { updateUserContext } from "../../utils";
// import Database from "@/app/utility/database";

export async function signUpPOST(
  input: STSignUpPOSTInput,
  originalImplementation: EmailPasswordNode.APIInterface
) {
  const response = await originalImplementation.signUpPOST!(input);

  const wasUserSuccessfullyCreated =
    response.status === "OK" && response.user.loginMethods.length === 1;

  if (!wasUserSuccessfullyCreated) return response;

  console.log(`\n\nUser was successfully created: \n\n`);

  const formFieldsObject = arrayToObjectWithKeys("id", "value", input.formFields) as FormFields;
  const { firstname, lastname, username } = formFieldsObject;
  input.userContext = updateUserContext(input.userContext, formFieldsObject);
  input.userContext.isSignUp = true;

  console.log("firstname, lastname, username", {
    firstname,
    lastname,
    username,
  });

  console.log();

  await UserMetadata.updateUserMetadata(
    response.user.id,
    { firstname, lastname, username },
    input.userContext
  );

  if (wasUserSuccessfullyCreated) {
    await EmailVerification.sendEmailVerificationEmail(
      response.session.getTenantId(),
      response.user.id,
      response.session.getRecipeUserId(),
      response.user.emails[0],
      input.userContext
    );
  }

  return response;
}
