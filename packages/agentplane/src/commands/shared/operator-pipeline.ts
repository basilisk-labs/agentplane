export type OperatorPipelineSpec<TState, TResult, TOutput = TResult> = {
  init: () => Promise<TState> | TState;
  preflight?: (state: TState) => Promise<void> | void;
  materialize?: (state: TState) => Promise<void> | void;
  execute: (state: TState) => Promise<TResult> | TResult;
  finalize?: (state: TState, result: TResult) => Promise<TOutput> | TOutput;
  cleanup?: (state: TState, result: TResult | null) => Promise<void> | void;
};

export async function runOperatorPipeline<TState, TResult, TOutput = TResult>(
  spec: OperatorPipelineSpec<TState, TResult, TOutput>,
): Promise<TOutput> {
  const state = await spec.init();
  let result: TResult | null = null;
  try {
    await spec.preflight?.(state);
    await spec.materialize?.(state);
    result = await spec.execute(state);
    if (spec.finalize) {
      return await spec.finalize(state, result);
    }
    return result as unknown as TOutput;
  } finally {
    await spec.cleanup?.(state, result);
  }
}
