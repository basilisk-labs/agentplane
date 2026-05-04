import type { CommandSpec } from "../cli/spec/spec.js";
export type DoctorParsed = {
    fix: boolean;
    dev: boolean;
    deep?: boolean;
    archiveFull?: boolean;
};
export declare const doctorSpec: CommandSpec<DoctorParsed>;
//# sourceMappingURL=doctor.spec.d.ts.map