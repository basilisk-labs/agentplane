import type {
  EvaluatorExecuteSession,
  EvaluatorPrepareSession,
  EvaluatorWriteSession,
} from "../command-catalog/context-evaluator-capability-profiles.js";
import type { NoContextSession } from "../command-catalog/project-capability-profiles.js";
import { loadDeferredRuntime } from "../deferred-runtime-loader.js";

export const loadEvaluatorSpec = (_session: NoContextSession) =>
  loadDeferredRuntime().then((m) => m.runEvaluatorGroup);
export const loadEvaluatorListSpec = (_session: NoContextSession) =>
  loadDeferredRuntime().then((m) => m.runEvaluatorList);
export const loadEvaluatorShowSpec = (_session: NoContextSession) =>
  loadDeferredRuntime().then((m) => m.runEvaluatorShow);
export const loadEvaluatorPrepareSpec = (session: EvaluatorPrepareSession) =>
  loadDeferredRuntime().then((m) =>
    m.makeRunEvaluatorPrepareHandler({
      getEvaluatorArtifactPort: (_ctx, command) =>
        session.require("evaluator.artifacts.write", command),
    }),
  );
export const loadEvaluatorApplySpec = (session: EvaluatorWriteSession) =>
  loadDeferredRuntime().then((m) =>
    m.makeRunEvaluatorApplyHandler({
      getCommandContext: async (_ctx, command) => {
        await session.require("evaluator.artifacts.write", command);
        return await session.require("task.write", command);
      },
    }),
  );
export const loadEvaluatorExecuteSpec = (session: EvaluatorExecuteSession) =>
  loadDeferredRuntime().then((m) =>
    m.makeRunEvaluatorExecuteHandler({
      getEvaluatorArtifactPort: (_ctx, command) =>
        session.require("evaluator.artifacts.write", command),
      getCommandContext: async (_ctx, command) => {
        await session.require("task.write", command);
        return await session.require("provider", command);
      },
    }),
  );
export const loadEvaluatorRunPrepareSpec = (session: EvaluatorPrepareSession) =>
  loadDeferredRuntime().then((m) =>
    m.makeRunEvaluatorRunPrepareHandler({
      getEvaluatorArtifactPort: (_ctx, command) =>
        session.require("evaluator.artifacts.write", command),
    }),
  );
export const loadEvaluatorRunWriteSpec = (session: EvaluatorWriteSession) =>
  loadDeferredRuntime().then((m) =>
    m.makeRunEvaluatorRunHandler({
      getEvaluatorArtifactPort: (_ctx, command) =>
        session.require("evaluator.artifacts.write", command),
      getCommandContext: (_ctx, command) => session.require("task.write", command),
    }),
  );
