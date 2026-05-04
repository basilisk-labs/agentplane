export declare function isTaskLocalAdvancePath(opts: {
    workflowDir: string;
    taskId: string;
    tasksPath?: string;
    relPath: string;
}): boolean;
export declare function isTaskLocalOnlyAdvance(opts: {
    gitRoot: string;
    workflowDir: string;
    taskId: string;
    tasksPath?: string;
    fromRef: string | null;
    toRef: string;
}): Promise<boolean>;
//# sourceMappingURL=task-local-freshness.d.ts.map