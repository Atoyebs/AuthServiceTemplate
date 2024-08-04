import { STCreateNewSessionInput } from "@/app/types";
import SessionNode from "supertokens-node/recipe/session";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import { connect, JSONCodec } from "nats";

export async function createNewSession(
  input: STCreateNewSessionInput,
  originalImplementation: SessionNode.RecipeInterface
) {
  try {
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

    const jsonCodec = JSONCodec();

    const nc = await connect({ servers: "localhost:4222" });

    nc.publish(
      "kasefile.auth",
      jsonCodec.encode({
        eventType: "kasefile.auth.signup",
        data: {
          email: input.userContext.email,
          userId: input.userId,
          firstname: metadata?.firstName || "",
          lastname: metadata?.lastName || "",
        },
      })
    );

    const session = await originalImplementation.createNewSession(input);

    return session;
  } catch (error) {
    console.error(`createNewSession error: `, error);
    throw error;
  }
}
