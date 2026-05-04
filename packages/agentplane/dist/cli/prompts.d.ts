export declare function selectPrompt(prompt: string, choices: string[], defaultValue: string): Promise<string>;
export declare function confirmPrompt(prompt: string, defaultValue: boolean): Promise<boolean>;
export declare function textPrompt(prompt: string): Promise<string>;
export declare const promptChoice: typeof selectPrompt;
export declare const promptYesNo: typeof confirmPrompt;
export declare const promptInput: typeof textPrompt;
//# sourceMappingURL=prompts.d.ts.map