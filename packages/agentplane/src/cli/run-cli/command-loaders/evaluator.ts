import type {
  EvaluatorExecuteSession,
  EvaluatorPrepareSession,
  EvaluatorWriteSession,
} from "../command-catalog/context-evaluator-capability-profiles.js";
import type { NoContextSession } from "../command-catalog/project-capability-profiles.js";

export const loadEvaluatorSpec = (_session: NoContextSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) => m.runEvaluatorGroup);
export const loadEvaluatorListSpec = (_session: NoContextSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) => m.runEvaluatorList);
export const loadEvaluatorShowSpec = (_session: NoContextSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) => m.runEvaluatorShow);
export const loadEvaluatorPrepareSpec = (session: EvaluatorPrepareSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) =>
    m.makeRunEvaluatorPrepareHandler({
      getEvaluatorArtifactPort: (_ctx, command) =>
        session.require("evaluator.artifacts.write", command),
    }),
  );
export const loadEvaluatorApplySpec = (session: EvaluatorWriteSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) =>
    m.makeRunEvaluatorApplyHandler({
      getCommandContext: async (_ctx, command) => {
        await session.require("evaluator.artifacts.write", command);
        return await session.require("task.write", command);
      },
    }),
  );
export const loadEvaluatorExecuteSpec = (session: EvaluatorExecuteSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) =>
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
  import("../../../commands/evaluator/evaluator.command.js").then((m) =>
    m.makeRunEvaluatorRunPrepareHandler({
      getEvaluatorArtifactPort: (_ctx, command) =>
        session.require("evaluator.artifacts.write", command),
    }),
  );
export const loadEvaluatorRunWriteSpec = (session: EvaluatorWriteSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) =>
    m.makeRunEvaluatorRunHandler({
      getEvaluatorArtifactPort: (_ctx, command) =>
        session.require("evaluator.artifacts.write", command),
      getCommandContext: (_ctx, command) => session.require("task.write", command),
    }),
  );
