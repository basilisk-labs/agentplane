import type { InitClackPrompts } from "./prompts.js";
type InitPreviewItem = {
    label: string;
    value: string | number | boolean | null | undefined;
};
export declare function renderInitPreview(items: InitPreviewItem[]): string;
export declare function section(clack: Pick<InitClackPrompts, "log" | "note">, title: string, message?: string): void;
export declare function introLogo(clack: Pick<InitClackPrompts, "note">): void;
export declare function previewInstall(clack: Pick<InitClackPrompts, "note">, items: InitPreviewItem[]): void;
export declare function outroSuccess(clack: Pick<InitClackPrompts, "outro">, root: string): void;
export declare function outroError(clack: Pick<InitClackPrompts, "log" | "outro">, error: unknown): void;
export {};
//# sourceMappingURL=ui.d.ts.map