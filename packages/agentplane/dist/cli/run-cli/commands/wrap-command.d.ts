export declare function wrapCommand<T>(opts: {
    command: string;
    rootOverride?: string;
    context?: Record<string, unknown>;
}, fn: () => Promise<T> | T): Promise<T>;
//# sourceMappingURL=wrap-command.d.ts.map