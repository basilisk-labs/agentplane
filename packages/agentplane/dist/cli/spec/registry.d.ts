import type { CommandHandler, CommandId, CommandSpec, MatchResult } from "./spec.js";
export type CommandGraphMatch<T> = {
    value: T;
    consumed: number;
};
export declare class CommandGraph<T> {
    private readonly getId;
    private readonly root;
    private readonly values;
    constructor(getId: (value: T) => CommandId);
    add(value: T): void;
    list(): readonly T[];
    lookup(id: CommandId): T | null;
    match(tokens: readonly string[]): CommandGraphMatch<T> | null;
    directChildren(parentId?: CommandId): readonly T[];
    directChildSegments(parentId?: CommandId): readonly string[];
    private resolveNode;
}
export declare class CommandRegistry {
    private readonly graph;
    register<TParsed>(spec: CommandSpec<TParsed>, handler: CommandHandler<TParsed>): void;
    list(): readonly {
        spec: CommandSpec;
        handler: CommandHandler;
    }[];
    match(tokens: readonly string[]): MatchResult | null;
    lookup(id: CommandId): {
        spec: CommandSpec;
        handler: CommandHandler;
    } | null;
    directChildren(parentId?: CommandId): readonly {
        spec: CommandSpec;
        handler: CommandHandler;
    }[];
    directChildSegments(parentId?: CommandId): readonly string[];
}
export declare function formatCommandId(id: CommandId): string;
//# sourceMappingURL=registry.d.ts.map