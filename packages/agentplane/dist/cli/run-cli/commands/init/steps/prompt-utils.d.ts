import type { InitPromptClack, InitPromptOption } from "./contracts.js";
export declare function selectStepValue<T extends string>(clack: InitPromptClack, opts: {
    message: string;
    options: InitPromptOption<T>[];
    initialValue: T;
    cancelMessage?: string;
}): Promise<T>;
export declare function confirmStepValue(clack: InitPromptClack, opts: {
    message: string;
    initialValue: boolean;
    cancelMessage?: string;
}): Promise<boolean>;
export declare function textStepValue(clack: InitPromptClack, opts: {
    message: string;
    defaultValue?: string;
    placeholder?: string;
    validate?: (value: string) => string | void;
    cancelMessage?: string;
}): Promise<string>;
export declare function parseCommaSeparatedSelection(answer: unknown, fallback: string[]): string[];
//# sourceMappingURL=prompt-utils.d.ts.map