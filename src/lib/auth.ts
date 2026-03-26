import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins"
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database/database";

export const auth = betterAuth({
     secret: process.env.BETTER_AUTH_SECRET!,
     url: process.env.BETTER_AUTH_URL!,
     database: drizzleAdapter(db, {
        provider: "pg",
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