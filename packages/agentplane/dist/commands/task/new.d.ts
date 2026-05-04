import { type CommandContext } from "../shared/task-backend.js";
export type TaskNewParsed = {
    title: string;
    description: string;
    owner: string;
    priority: "low" | "normal" | "med" | "high";
    tags: string[];
    dependsOn: string[];
    verify: string[];
    allowDuplicate: boolean;
};
export declare function runTaskNewParsed(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    parsed: TaskNewParsed;
}): Promise<number>;
//# sourceMappingURL=new.d.ts.map