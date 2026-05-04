import { type CommandContext } from "../shared/task-backend.js";
export declare function cmdTaskUpdate(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    title?: string;
    description?: string;
    priority?: string;
    owner?: string;
    tags: string[];
    replaceTags: boolean;
    dependsOn: string[];
    replaceDependsOn: boolean;
    verify: string[];
    replaceVerify: boolean;
    allowPrimaryChange?: boolean;
}): Promise<number>;
//# sourceMappingURL=update.d.ts.map