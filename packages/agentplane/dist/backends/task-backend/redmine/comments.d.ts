export type TaskComment = {
    author: string;
    body: string;
};
export declare function normalizeComments(value: unknown): TaskComment[];
export declare function appendCommentNotes(opts: {
    issueId: string;
    existingComments: TaskComment[];
    desiredComments: TaskComment[];
    requestJson: (method: string, reqPath: string, payload?: Record<string, unknown>, params?: Record<string, unknown>) => Promise<Record<string, unknown>>;
}): Promise<void>;
//# sourceMappingURL=comments.d.ts.map