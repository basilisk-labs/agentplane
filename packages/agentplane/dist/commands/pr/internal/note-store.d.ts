export type PrHandoffNote = {
    schema_version: 1;
    created_at: string;
    author: string;
    body: string;
};
export declare function buildPrHandoffNote(opts: {
    createdAt: string;
    author: string;
    body: string;
}): PrHandoffNote;
export declare function parsePrHandoffNotes(raw: string): PrHandoffNote[];
export declare function readPrHandoffNotes(notesPath: string): Promise<PrHandoffNote[]>;
export declare function appendPrHandoffNote(opts: {
    notesPath: string;
    note: PrHandoffNote;
}): Promise<void>;
//# sourceMappingURL=note-store.d.ts.map