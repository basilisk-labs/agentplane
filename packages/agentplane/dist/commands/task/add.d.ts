import { type CommandContext } from "../shared/task-backend.js";
export declare function cmdTaskAdd(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskIds: string[];
    title: string;
    description: string;
    status: string;
    priority: string;
    owner: string;
    tags: string[];
    dependsOn: string[];
    verify: string[];
    commentAuthor: string | null;
    commentBody: string | null;
}): Promise<number>;
//# sourceMappingURL=add.d.ts.map