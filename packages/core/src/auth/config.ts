import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";

import { type Database } from "../database";
import * as authSchema from "../database/schema/auth.schema";
import { admin, openAPI, organization } from "better-auth/plugins";

export interface AuthConfigurations {
  database: Database;
  secret?: string;
  plugins?: Parameters<typeof betterAuth>[0]["plugins"];
}

export function configAuth(config: AuthConfigurations) {
  const baseAuthInstance = betterAuth({
    //  trustedOrigins: [process.env.CLIENT_URL!],
    trustedOrigins: [
  "http://localhost:3000", // your frontend dev
  "http://localhost:3001", // other port
  "http://127.0.0.1:3001"
],
    baseURL: process.env.BETTER_AUTH_URL,
    database: drizzleAdapter(config.database, {
      
      provider: "pg",
      schema: authSchema,
      usePlural: true
    }),
    secret: config.secret,
    plugins: [admin(), openAPI(),organization({
      allowUserToCreateOrganization() {
        // TODO: In future, Allow permissions based on user's subscription
        return true;
      }
    }), ...(config.plugins || [])],

    emailAndPassword: {
      enabled: true
    },

    advanced: {
      disableOriginCheck: true,
    crossSubDomainCookies: {
      enabled: true
    },
    defaultCookieAttributes: {
      sameSite: "lax",
      httpOnly: true
    }
  }
  });

  return baseAuthInstance;
}

export type AuthInstance = ReturnType<typeof configAuth>;
