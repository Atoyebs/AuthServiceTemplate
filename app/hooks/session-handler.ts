import { useEffect, useState } from "react";
import { useRouter, redirect } from "next/navigation";
import axios from "axios";
import { SessionInfo, STAccessTokenPayload } from "../types";

type SessionHandlerProps = {
  onSessionFoundRedirect?: () => void;
  onSessionNotFoundRedirect?: () => void;
};

export const useSessionHandler = (actionProps: SessionHandlerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [didError, setDidError] = useState(false);
  const [sessionPayload, setSessionPayload] = useState<SessionInfo>();
  const [doesSessionExist, setDoesSessionExist] = useState(false);

  useEffect(() => {
    axios
      .get("/api/user/session", { withCredentials: true })
      .then(({ data, status }) => {
        const payload: STAccessTokenPayload = data?.accessTokenPayload || {};

        if (status >= 200 && status < 300) {
          setDoesSessionExist(true);
          setSessionPayload({
            userId: data?.userId ?? "",
            email: payload?.email ?? "",
            firstname: payload?.firstname ?? "",
            lastname: payload?.lastname ?? "",
          });
          if (actionProps?.onSessionFoundRedirect) {
            actionProps.onSessionFoundRedirect();
          }
        }
      })
      .catch((error) => {
        setDidError(true);
        setDoesSessionExist(false);
        if (actionProps?.onSessionNotFoundRedirect) {
          actionProps.onSessionNotFoundRedirect();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    didError,
    isLoading,
    doesSessionExist,
    sessionPayload,
  };
};
