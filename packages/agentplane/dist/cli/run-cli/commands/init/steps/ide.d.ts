import type { InitDefaults, InitFlags } from "../model.js";
import type { IdeStepAnswers, InitPromptClack } from "./contracts.js";
export declare function promptIdeStep(opts: {
    clack: InitPromptClack;
    flags: Pick<InitFlags, "ide">;
    defaults?: Pick<InitDefaults, "ide">;
}): Promise<IdeStepAnswers>;
//# sourceMappingURL=ide.d.ts.map