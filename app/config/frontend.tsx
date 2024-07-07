import { useRouter } from "next/navigation";
import SuperTokens from 'supertokens-web-js';
import SessionWeb from 'supertokens-web-js/recipe/session';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword'

const routerInfo: { router?: ReturnType<typeof useRouter>; pathName?: string } = {};

export function setRouter(router: ReturnType<typeof useRouter>, pathName: string) {
    routerInfo.router = router;
    routerInfo.pathName = pathName;
}

export const customFrontendConfig = (): void => {
    return SuperTokens.init({
        appInfo: {
            apiDomain: "http://localhost:3000",
            apiBasePath: "/api/v1/auth",
            appName: "Auth Template",
        },
        recipeList: [
            SessionWeb.init(),
            EmailPassword.init(),
        ],
    });
}

export const recipeDetails = {
    docsLink: "https://supertokens.com/docs/thirdpartyemailpassword/introduction",
};

