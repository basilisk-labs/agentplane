import { type ReleaseCommandLabel } from "./apply.preflight.git.js";
export declare function ensureNpmVersionsAvailable(gitRoot: string, version: string, commandLabel?: ReleaseCommandLabel): Promise<void>;
export declare function runReleasePrepublishGate(gitRoot: string, commandLabel?: ReleaseCommandLabel): Promise<void>;
//# sourceMappingURL=apply.preflight.publish.d.ts.map