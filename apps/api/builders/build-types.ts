// build-types.ts
import { resolve } from "path";

// Establish directory structure
const BUILDERS_DIR = import.meta.dir;
const API_ROOT = resolve(BUILDERS_DIR, "..");
const DIST_TYPES = resolve(API_ROOT, "dist", "types");
const SRC = resolve(API_ROOT, "src");

async function buildTypes() {
  console.log("📦 Building type exports for RPC...\n");

  try {
    console.log("📝 Bundling router types...");

    const result = await Bun.build({
      entrypoints: [resolve(SRC, "registry", "index.ts")],
      outdir: DIST_TYPES,
      target: "node",
      format: "esm",
      splitting: false,
      minify: false,
      sourcemap: "external",
      external: [
        "hono",
        "hono/*",
        "@hono/zod-openapi",
        "@scalar/hono-api-reference",
        "stoker",
        "@neondatabase/serverless",
        "ws"
      ],
      naming: {
        entry: "index.js"
      }
    });

    if (!result.success) {
      console.error("❌ Type export build failed:");
      for (const message of result.logs) {
        console.error(message);
      }
      process.exit(1);
    }

    console.log("✓ Router types bundled successfully");
    console.log(`✓ Generated ${result.outputs.length} file(s)\n`);
    console.log("🎉 Type export build completed successfully!");
  } catch (error) {
    console.error("❌ Type export build failed:", error);
    process.exit(1);
  }
}

buildTypes();
