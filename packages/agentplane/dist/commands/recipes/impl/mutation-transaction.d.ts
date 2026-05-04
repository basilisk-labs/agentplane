export declare function runVendoredRecipeMutation<T>(opts: {
    targetDir: string;
    mode: "create" | "replace" | "remove";
    materialize?: (targetDir: string) => Promise<void>;
    commit: () => Promise<T>;
}): Promise<T>;
//# sourceMappingURL=mutation-transaction.d.ts.map