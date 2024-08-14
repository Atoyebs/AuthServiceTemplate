import EmailPasswordNode from "supertokens-node/recipe/emailpassword";
import EmailVerification from "supertokens-node/recipe/emailverification";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import UserRole from "supertokens-node/recipe/userroles";
import { FormFields, STSignUpPOSTInput } from "@/app/types";
import { USER_ROLES } from "@/app/types/database";
import { arrayToObjectWithKeys } from "../../../utility";
import { updateUserContext } from "../../utils";
import { connect, JSONCodec } from "nats";

function getUsersThatHaveRoleDidPass(response: any): response is { status: "OK"; users: string[] } {
  return response?.status === "OK";
}

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
  const { firstname, lastname, username, email } = formFieldsObject;
  input.userContext = updateUserContext(input.userContext, formFieldsObject);
  input.userContext.isSignUp = true;

  const jsonCodec = JSONCodec();

  const nc = await connect({ servers: process.env.NEXT_SERVER_NATS_SERVER_URL! });

  nc.publish(
    process.env.NEXT_SERVER_NATS_AUTH_TOPIC!,
    jsonCodec.encode({
      eventType: "kasefile.auth.signup",
      data: {
        email,
        userId: response.user.id,
        firstname,
        lastname,
      },
    })
  );

  await UserMetadata.updateUserMetadata(
    response.user.id,
    { firstname, lastname, username },
    input.userContext
  );

  if (wasUserSuccessfullyCreated) {
    await handleSuperAdminRoleAssignment(response.session.getTenantId(), response.user.id);

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

async function handleSuperAdminRoleAssignment(tenantId: string, userId: string) {
  const { roles } = await UserRole.getAllRoles();
  const hasSuperAdminRole = roles?.includes(USER_ROLES.SUPER_ADMIN);

  if (!hasSuperAdminRole) {
    await UserRole.createNewRoleOrAddPermissions(USER_ROLES.SUPER_ADMIN, []);
  }

  const usersWithSuperAdminRole = await UserRole.getUsersThatHaveRole(
    tenantId,
    USER_ROLES.SUPER_ADMIN
  );
  const resWasSuccessful = getUsersThatHaveRoleDidPass(usersWithSuperAdminRole);
  console.log("\n>>existing superAdmins: ", usersWithSuperAdminRole);

  //if there are no users with an existing super-admin role, then create a user with the super-admin role

  if (resWasSuccessful && usersWithSuperAdminRole?.users?.length === 0) {
    await UserRole.addRoleToUser(tenantId, userId, USER_ROLES.SUPER_ADMIN);
  }
}
