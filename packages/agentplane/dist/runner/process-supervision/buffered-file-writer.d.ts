export declare class BufferedFileWriter {
    #private;
    constructor(opts: {
        file_path: string;
        on_error: (err: unknown) => void;
    });
    append(text: string): void;
    flush(): Promise<void>;
}
//# sourceMappingURL=buffered-file-writer.d.ts.map