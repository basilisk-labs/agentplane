import { type TaskWriteOptions } from "./shared.js";
import { type LocalBackendContext } from "./local-backend-state.js";
export declare function setLocalTaskDoc(context: LocalBackendContext, taskId: string, doc: string, updatedBy?: string, opts?: TaskWriteOptions): Promise<void>;
export declare function touchLocalTaskDocMetadata(context: LocalBackendContext, taskId: string, updatedBy?: string, opts?: TaskWriteOptions): Promise<void>;
//# sourceMappingURL=local-backend-doc.d.ts.map