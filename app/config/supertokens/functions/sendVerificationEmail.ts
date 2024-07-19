import { EmailDeliveryInterface } from "supertokens-node/lib/build/ingredients/emaildelivery/types";
import { TypeEmailVerificationEmailDeliveryInput } from "supertokens-node/lib/build/recipe/emailverification/types";
import { UserContext } from "supertokens-node/types";

export const sendVerificationEmail = (
  originalImplementation: EmailDeliveryInterface<TypeEmailVerificationEmailDeliveryInput>,
  input: TypeEmailVerificationEmailDeliveryInput & {
    tenantId: string;
    userContext: UserContext;
  }
) => {
  return originalImplementation.sendEmail({
    ...input,
    emailVerifyLink: input.emailVerifyLink.replace(
      `${process.env.NEXT_SERVER_WEBSITE_DOMAIN}${process.env?.NEXT_SERVER_WEBSITE_BASE_PATH}/verify-email`,
      `${process.env.NEXT_SERVER_WEBSITE_DOMAIN}/${process.env.NEXT_SERVER_WEBSITE_VERIFICATION_PAGE_PATH}`
    ),
  });
};
