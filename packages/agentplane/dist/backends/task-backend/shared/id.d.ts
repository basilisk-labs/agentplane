type GenerateTaskId = (opts: {
    length: number;
    attempts: number;
    isAvailable?: (taskId: string) => boolean | Promise<boolean>;
    date?: Date;
}) => Promise<string>;
export declare const generateTaskId: GenerateTaskId;
export declare function validateTaskId(taskId: string): void;
export declare function missingTaskIdMessage(): string;
export declare function unknownTaskIdMessage(taskId: string): string;
export declare function invalidLengthMessage(value: number, min: number): string;
export {};
//# sourceMappingURL=id.d.ts.map