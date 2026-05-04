import { type GroupCommandParsed } from "../../cli/group-command.js";
import type { CommandSpec } from "../../cli/spec/spec.js";
export type PrGroupParsed = GroupCommandParsed;
export declare const prSpec: CommandSpec<PrGroupParsed>;
export type PrOpenParsed = {
    taskId: string;
    author: string;
    branch: string | null;
    includeTaskIds: string[];
    syncOnly: boolean;
};
export declare const prOpenSpec: CommandSpec<PrOpenParsed>;
export type PrUpdateParsed = {
    taskId: string;
    includeTaskIds: string[];
};
export declare const prUpdateSpec: CommandSpec<PrUpdateParsed>;
export type PrCheckParsed = {
    taskId: string;
};
export declare const prCheckSpec: CommandSpec<PrCheckParsed>;
export type PrNoteParsed = {
    taskId: string;
    author: string;
    body?: string;
    bodyFile?: string;
};
export declare const prNoteSpec: CommandSpec<PrNoteParsed>;
export type PrCloseParsed = {
    prNumber: number;
    repo?: string;
    comment?: string;
    deleteRemoteBranch: boolean;
};
export declare const prCloseSpec: CommandSpec<PrCloseParsed>;
export type PrCloseSupersededParsed = {
    taskId: string;
    deleteRemoteBranch: boolean;
};
export declare const prCloseSupersededSpec: CommandSpec<PrCloseSupersededParsed>;
//# sourceMappingURL=pr.spec.d.ts.map