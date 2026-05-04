import type { Logger, LoggerMode } from "@agentplaneorg/core/logger";
export type CliOutputWriter = {
    write: (chunk: string) => unknown;
};
export type CliEmitterStream = "stdout" | "stderr";
export type CliReportEntry = string | {
    label: string;
    value?: string | number | boolean | null;
};
export type CliReportOptions = {
    header?: string;
    stream?: CliEmitterStream;
};
export type CliEmitter = {
    line: (text: string, stream?: CliEmitterStream) => void;
    lines: (lines: Iterable<string>, stream?: CliEmitterStream) => void;
    json: (value: unknown, stream?: CliEmitterStream) => void;
    jsonSection: (label: string, value: unknown, options?: {
        indent?: string;
        stream?: CliEmitterStream;
    }) => void;
    report: (entries: Iterable<CliReportEntry>, options?: CliReportOptions) => void;
    info: (message: string, stream?: CliEmitterStream) => void;
    warn: (message: string, stream?: CliEmitterStream) => void;
    success: (action: string, target?: string, details?: string, stream?: CliEmitterStream) => void;
};
export type CommandResult = {
    kind: "line";
    text: string;
    stream?: CliEmitterStream;
} | {
    kind: "info";
    message: string;
    stream?: CliEmitterStream;
} | {
    kind: "warn";
    message: string;
    stream?: CliEmitterStream;
} | {
    kind: "success";
    action: string;
    target?: string;
    details?: string;
    stream?: CliEmitterStream;
} | {
    kind: "json";
    value: unknown;
    stream?: CliEmitterStream;
} | {
    kind: "report";
    entries: Iterable<CliReportEntry>;
    options?: CliReportOptions;
};
export declare function successMessage(action: string, target?: string, details?: string): string;
export declare function infoMessage(message: string): string;
export declare function warnMessage(message: string): string;
export declare function usageMessage(usage: string, example?: string): string;
export declare function backendNotSupportedMessage(feature: string): string;
export declare function missingValueMessage(flag: string): string;
export declare function invalidValueMessage(label: string, value: string, expected: string): string;
export declare function invalidValueForFlag(flag: string, value: string, expected: string): string;
export declare function unknownEntityMessage(entity: string, value: string): string;
export declare function emptyStateMessage(resource: string, hint?: string): string;
export declare function requiredFieldMessage(field: string, source?: string): string;
export declare function invalidFieldMessage(field: string, expected: string, source?: string): string;
export declare function invalidPathMessage(field: string, reason: string, source?: string): string;
export declare function missingFileMessage(filename: string, rootHint?: string): string;
export declare function workflowModeMessage(actual: string | undefined, expected: string): string;
export declare function createCliEmitter(streams?: {
    stdout?: CliOutputWriter;
    stderr?: CliOutputWriter;
    loggerMode?: LoggerMode;
    logger?: Logger;
}): CliEmitter;
export declare function emitCommandResult(emitter: CliEmitter, result: CommandResult): void;
export declare function emitCommandResults(emitter: CliEmitter, results: Iterable<CommandResult>): void;
//# sourceMappingURL=output.d.ts.map