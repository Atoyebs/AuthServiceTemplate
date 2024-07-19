'use client';
import React from 'react';
import { customFrontendConfig } from '../config/supertokens/frontend';

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  customFrontendConfig();
}

export const SuperTokensInit: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return <>{children}</>;
};