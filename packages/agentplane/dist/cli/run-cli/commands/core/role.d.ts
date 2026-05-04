import type { CommandHandler, CommandSpec } from "../../../spec/spec.js";
type RoleParsed = {
    role: string;
    json: boolean;
};
export declare const roleSpec: CommandSpec<RoleParsed>;
export declare const runRole: CommandHandler<RoleParsed>;
export {};
//# sourceMappingURL=role.d.ts.map