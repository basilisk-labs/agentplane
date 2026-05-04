export type OperatorPipelineSpec<TState, TResult, TOutput = TResult> = {
    init: () => Promise<TState> | TState;
    preflight?: (state: TState) => Promise<void> | void;
    materialize?: (state: TState) => Promise<void> | void;
    execute: (state: TState) => Promise<TResult> | TResult;
    finalize?: (state: TState, result: TResult) => Promise<TOutput> | TOutput;
    cleanup?: (state: TState, result: TResult | null) => Promise<void> | void;
};
export declare function runOperatorPipeline<TState, TResult, TOutput = TResult>(spec: OperatorPipelineSpec<TState, TResult, TOutput>): Promise<TOutput>;
//# sourceMappingURL=operator-pipeline.d.ts.map