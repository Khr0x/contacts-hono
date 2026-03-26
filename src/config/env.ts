import { config } from 'dotenv';
import { z } from 'zod';

config({path: ['.env', '.env.local']});

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  PORT: z.string().default('3000').transform(Number),
  
  DATABASE_URL: z.string().url({
    message: 'DATABASE_URL debe ser una URL válida',
  }),
  
  BETTER_AUTH_SECRET: z.string().min(32, {
    message: 'BETTER_AUTH_SECRET debe tener al menos 32 caracteres',
  }),
  BETTER_AUTH_URL: z.string().url().optional(),
  
  ALLOWED_ORIGINS: z.string().default('*'),
});

const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Error de validación de variables de entorno:');
      error.issues.forEach((issue) => {
        console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
      });
      process.exit(1);
    }
    throw error;
  }
};

export const env = parseEnv();

export type Env = z.infer<typeof envSchema>;
