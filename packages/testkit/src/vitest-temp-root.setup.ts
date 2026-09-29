import { afterAll } from "vitest";

import { installOwnedVitestTempRoot } from "./cli-harness/temp-root-cleanup.js";

const cleanup = await installOwnedVitestTempRoot();

afterAll(cleanup);
