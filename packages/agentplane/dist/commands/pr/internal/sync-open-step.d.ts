import { type PrMeta } from "../../shared/pr-meta.js";
import type { PrOpenOutcome, PrRemoteMode, PrSyncCommonState } from "./sync-model.js";
export declare function runPrOpenSync(common: PrSyncCommonState, opts: {
    author?: string;
    remoteMode: PrRemoteMode;
}): Promise<{
    meta: PrMeta;
    openOutcome?: PrOpenOutcome;
}>;
//# sourceMappingURL=sync-open-step.d.ts.map