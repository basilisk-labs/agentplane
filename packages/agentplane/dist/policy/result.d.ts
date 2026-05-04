import type { PolicyProblem, PolicyResult } from "./model.js";
export declare function okResult(): PolicyResult;
export declare function usageError(message: string): PolicyProblem;
export declare function gitError(message: string): PolicyProblem;
export declare function internalError(message: string): PolicyProblem;
export declare function mergeResults(...items: PolicyResult[]): PolicyResult;
//# sourceMappingURL=result.d.ts.map