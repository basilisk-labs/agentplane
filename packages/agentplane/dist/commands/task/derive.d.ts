import { type CommandContext } from "../shared/task-backend.js";
export declare function cmdTaskDerive(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    spikeId: string;
    title: string;
    description: string;
    owner: string;
    priority: "low" | "normal" | "med" | "high";
    tags: string[];
    verify: string[];
}): Promise<number>;
//# sourceMappingURL=derive.d.ts.map