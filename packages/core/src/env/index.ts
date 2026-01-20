import { z } from "zod";

const envSchema = z.object({
  // Port - If needed
  PORT: z.string().optional(),

  // Database
  DATABASE_URL: z.url().describe("PostgreSQL connection string"),

  // Auth
  // Make them optional to allow better flexibility in different environments
  BETTER_AUTH_SECRET: z.string().optional(),
  BETTER_AUTH_URL: z.string().optional(),

  // Client
  CLIENT_URL: z.url().describe("Client application URL").optional(),

  // API
  API_URL: z
    .url()
    .default("http://localhost:4000")
    .describe("API base URL for RPC client")
    .optional()
});

function validateEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("❌ Invalid environment variables:");
    console.error(z.treeifyError(result.error));

    throw new Error("Invalid environment variables");
  }

  return result.data;
}

export const env = validateEnv();

export type Env = z.infer<typeof envSchema>;

export { envSchema };
