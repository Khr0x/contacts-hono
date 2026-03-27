import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins"
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database/database";
import * as schema from "../database/schema";

export const auth = betterAuth({
     secret: process.env.BETTER_AUTH_SECRET!,
     url: process.env.BETTER_AUTH_URL!,
     emailAndPassword: {
        enabled: true,
     },
     trustedOrigins: [process.env.ALLOWED_ORIGINS!],
     database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema
    }),
    plugins: [
        organization()
    ],
    advanced: {
        cookies: {
            sessionToken: {
                attributes: {
                    sameSite: "none",
                    secure: true,
                    partitioned: true
                }
            }
        }
    }
});