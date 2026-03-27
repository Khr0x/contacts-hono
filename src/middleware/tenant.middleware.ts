import { sql } from 'drizzle-orm';
import { createMiddleware } from 'hono/factory';
import { db } from '../database/database';

type Env = {
  Variables: {
    session: {
      activeOrganizationId: string;
      [key: string]: any;
    };
    tx: any;
  };
};

export const tenantMiddleware = createMiddleware<Env>(async (c, next) => {
  const session = c.get('session');
  const activeOrgId = session?.activeOrganizationId;

  if (!activeOrgId) return c.json({ error: 'No active organization' }, 401);

  return await db.transaction(async (tx) => {
    try {
        await tx.execute(sql`SELECT set_config('app.current_tenant', ${activeOrgId}, true)`);
        c.set('tx', tx);
        
        await next();
    } catch (error) {
       console.error('Transaction error in tenantMiddleware:', error);
       return c.json({ error: 'Database transaction failed' }, 500);
    }

  });
});