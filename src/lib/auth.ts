import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins"
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database/database";
import * as schema from "../database/schema";
import { eq } from "drizzle-orm";
import { member, organization as organizationTable } from "../modules/auth/schema/auth.schema";

async function getInitialOrganization(userId: string) {
    const result = await db
        .select({
            organization: organizationTable
        })
        .from(member)
        .innerJoin(organizationTable, eq(member.organizationId, organizationTable.id))
        .where(eq(member.userId, userId))
        .limit(1);

    return result[0]?.organization ?? null;
}

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
    },
    databaseHooks: {
            session: {
                create: {
                    before: async (session) => {
                    // Implement your custom logic to set initial active organization
                    const organization = await getInitialOrganization(session.userId);
                    return {
                        data: {
                        ...session,
                        activeOrganizationId: organization?.id,
                        },
                      };
                    },
                },
            },
    }
});