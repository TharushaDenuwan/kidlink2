// This file exports ONLY the Router type for RPC consumption
// It re-exports from registry but is used as a cleaner entry point
// for external packages that need the Router type

export type { Router } from "./registry";
