import { contextIngestSpec } from "../../../commands/context/ingest.spec.js";
import {
  contextCapabilityDiscoverSpec,
  contextCapabilitySearchSpec,
  contextCapabilitySpec,
  contextCapabilityValidateSpec,
  contextDashboardSpec,
  contextDoctorSpec,
  contextExtractionApplySpec,
  contextFinalizeTaskSpec,
  contextGraphExportSpec,
  contextGraphNeighborsSpec,
  contextGraphShowSpec,
  contextGraphSpec,
  contextGraphSummarySpec,
  contextGraphValidateSpec,
  contextHarvestSpec,
  contextHarvestTasksSpec,
  contextInitSpec,
  contextMigrateSpec,
  contextReindexSpec,
  contextSearchSpec,
  contextShowSpec,
  contextSpec,
  contextSuperviseTaskSpec,
  contextVerifyTaskSpec,
  contextWikiExplainSpec,
  contextWikiIndexSpec,
  contextWikiLinkSpec,
  contextWikiLintSpec,
  contextWikiNewSpec,
  contextWikiReportSpec,
  contextWikiSpec,
} from "../../../commands/context/context.spec.js";
import {
  contextCheckSpec,
  contextLearnChangesSpec,
  contextLearnFilesSpec,
  contextLearnSpec,
  contextLearnTasksSpec,
} from "../../../commands/context/context.learn.spec.js";
import {
  evaluatorApplySpec,
  evaluatorExecuteSpec,
  evaluatorListSpec,
  evaluatorPrepareSpec,
  evaluatorRunSpec,
  evaluatorShowSpec,
  evaluatorSpec,
} from "../../../commands/evaluator/evaluator.command.js";
import {
  loadContextCapabilityDiscoverSpec,
  loadContextCapabilityGroupSpec,
  loadContextCapabilitySearchSpec,
  loadContextCapabilityValidateSpec,
  loadContextCheckSpec,
  loadContextDashboardSpec,
  loadContextDoctorSpec,
  loadContextExtractionApplySpec,
  loadContextFinalizeTaskSpec,
  loadContextGraphExportSpec,
  loadContextGraphGroupSpec,
  loadContextGraphNeighborsSpec,
  loadContextGraphShowSpec,
  loadContextGraphSummarySpec,
  loadContextGraphValidateSpec,
  loadContextGroupSpec,
  loadContextHarvestGroupSpec,
  loadContextHarvestTasksSpec,
  loadContextIngestSpec,
  loadContextInitSpec,
  loadContextLearnChangesSpec,
  loadContextLearnFilesSpec,
  loadContextLearnGroupSpec,
  loadContextLearnTasksSpec,
  loadContextMigrateSpec,
  loadContextReindexSpec,
  loadContextSearchSpec,
  loadContextShowSpec,
  loadContextSuperviseTaskSpec,
  loadContextVerifyTaskSpec,
  loadContextWikiExplainSpec,
  loadContextWikiGroupSpec,
  loadContextWikiIndexSpec,
  loadContextWikiLinkSpec,
  loadContextWikiLintSpec,
  loadContextWikiNewSpec,
  loadContextWikiReportSpec,
} from "../command-loaders/project.js";
import {
  loadEvaluatorApplySpec,
  loadEvaluatorExecuteSpec,
  loadEvaluatorListSpec,
  loadEvaluatorPrepareSpec,
  loadEvaluatorRunPrepareSpec,
  loadEvaluatorRunWriteSpec,
  loadEvaluatorShowSpec,
  loadEvaluatorSpec,
} from "../command-loaders/evaluator.js";

import {
  declareConditionalSessionCommand,
  declareSessionCommand,
  type CommandEntry,
} from "./kernel.js";
import {
  CONTEXT_PROJECT_REQUIREMENTS,
  CONTEXT_TASK_READ_REQUIREMENTS,
  CONTEXT_TASK_WRITE_REQUIREMENTS,
  EVALUATOR_EXECUTE_REQUIREMENTS,
  EVALUATOR_PREPARE_REQUIREMENTS,
  EVALUATOR_WRITE_REQUIREMENTS,
} from "./context-evaluator-capability-profiles.js";
import { NO_CONTEXT_REQUIREMENTS } from "./project-capability-profiles.js";

export const EVALUATOR_COMMANDS = [
  declareSessionCommand(evaluatorSpec, {
    load: loadEvaluatorSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareSessionCommand(evaluatorListSpec, {
    load: loadEvaluatorListSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareSessionCommand(evaluatorShowSpec, {
    load: loadEvaluatorShowSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareSessionCommand(evaluatorPrepareSpec, {
    load: loadEvaluatorPrepareSpec,
    requirements: EVALUATOR_PREPARE_REQUIREMENTS,
  }),
  declareSessionCommand(evaluatorApplySpec, {
    load: loadEvaluatorApplySpec,
    requirements: EVALUATOR_WRITE_REQUIREMENTS,
  }),
  declareSessionCommand(evaluatorExecuteSpec, {
    load: loadEvaluatorExecuteSpec,
    requirements: EVALUATOR_EXECUTE_REQUIREMENTS,
  }),
  declareConditionalSessionCommand(evaluatorRunSpec, {
    default: {
      load: loadEvaluatorRunPrepareSpec,
      requirements: EVALUATOR_PREPARE_REQUIREMENTS,
    },
    selected: {
      when: (parsed) => parsed.record,
      load: loadEvaluatorRunWriteSpec,
      requirements: EVALUATOR_WRITE_REQUIREMENTS,
    },
  }),
] as const satisfies readonly CommandEntry[];

export const CONTEXT_COMMANDS = [
  declareSessionCommand(contextSpec, {
    load: loadContextGroupSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareSessionCommand(contextIngestSpec, {
    load: loadContextIngestSpec,
    requirements: CONTEXT_TASK_WRITE_REQUIREMENTS,
    surface: "advanced",
  }),
  declareSessionCommand(contextInitSpec, {
    load: loadContextInitSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareSessionCommand(contextMigrateSpec, {
    load: loadContextMigrateSpec,
    requirements: CONTEXT_PROJECT_REQUIREMENTS,
    surface: "advanced",
  }),
  declareSessionCommand(contextLearnSpec, {
    load: loadContextLearnGroupSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareSessionCommand(contextLearnFilesSpec, {
    load: loadContextLearnFilesSpec,
    requirements: CONTEXT_TASK_WRITE_REQUIREMENTS,
  }),
  declareSessionCommand(contextLearnChangesSpec, {
    load: loadContextLearnChangesSpec,
    requirements: CONTEXT_TASK_WRITE_REQUIREMENTS,
  }),
  declareSessionCommand(contextLearnTasksSpec, {
    load: loadContextLearnTasksSpec,
    requirements: CONTEXT_TASK_WRITE_REQUIREMENTS,
  }),
  declareSessionCommand(contextCheckSpec, {
    load: loadContextCheckSpec,
    requirements: CONTEXT_PROJECT_REQUIREMENTS,
  }),
  declareSessionCommand(contextReindexSpec, {
    load: loadContextReindexSpec,
    requirements: CONTEXT_PROJECT_REQUIREMENTS,
    surface: "advanced",
  }),
  declareSessionCommand(contextSearchSpec, {
    load: loadContextSearchSpec,
    requirements: CONTEXT_PROJECT_REQUIREMENTS,
  }),
  declareSessionCommand(contextDashboardSpec, {
    load: loadContextDashboardSpec,
    requirements: CONTEXT_PROJECT_REQUIREMENTS,
  }),
  declareSessionCommand(contextShowSpec, {
    load: loadContextShowSpec,
    requirements: CONTEXT_PROJECT_REQUIREMENTS,
  }),
  declareSessionCommand(contextWikiSpec, {
    load: loadContextWikiGroupSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareSessionCommand(contextWikiNewSpec, {
    load: loadContextWikiNewSpec,
    requirements: CONTEXT_PROJECT_REQUIREMENTS,
  }),
  declareSessionCommand(contextWikiLintSpec, {
    load: loadContextWikiLintSpec,
    requirements: CONTEXT_PROJECT_REQUIREMENTS,
  }),
  declareSessionCommand(contextWikiExplainSpec, {
    load: loadContextWikiExplainSpec,
    requirements: CONTEXT_PROJECT_REQUIREMENTS,
  }),
  declareSessionCommand(contextWikiLinkSpec, {
    load: loadContextWikiLinkSpec,
    requirements: CONTEXT_PROJECT_REQUIREMENTS,
  }),
  declareSessionCommand(contextWikiIndexSpec, {
    load: loadContextWikiIndexSpec,
    requirements: CONTEXT_PROJECT_REQUIREMENTS,
  }),
  declareSessionCommand(contextWikiReportSpec, {
    load: loadContextWikiReportSpec,
    requirements: CONTEXT_PROJECT_REQUIREMENTS,
  }),
  declareSessionCommand(contextDoctorSpec, {
    load: loadContextDoctorSpec,
    requirements: CONTEXT_PROJECT_REQUIREMENTS,
    surface: "advanced",
  }),
  declareSessionCommand(contextFinalizeTaskSpec, {
    load: loadContextFinalizeTaskSpec,
    requirements: CONTEXT_TASK_WRITE_REQUIREMENTS,
  }),
  declareSessionCommand(contextSuperviseTaskSpec, {
    load: loadContextSuperviseTaskSpec,
    requirements: CONTEXT_TASK_WRITE_REQUIREMENTS,
  }),
  declareSessionCommand(contextVerifyTaskSpec, {
    load: loadContextVerifyTaskSpec,
    requirements: CONTEXT_TASK_READ_REQUIREMENTS,
    surface: "advanced",
  }),
  declareSessionCommand(contextHarvestSpec, {
    load: loadContextHarvestGroupSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
    surface: "advanced",
  }),
  declareSessionCommand(contextHarvestTasksSpec, {
    load: loadContextHarvestTasksSpec,
    requirements: CONTEXT_TASK_WRITE_REQUIREMENTS,
    surface: "advanced",
  }),
  declareSessionCommand(contextGraphSpec, {
    load: loadContextGraphGroupSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
    surface: "advanced",
  }),
  declareSessionCommand(contextGraphSummarySpec, {
    load: loadContextGraphSummarySpec,
    requirements: CONTEXT_PROJECT_REQUIREMENTS,
    surface: "advanced",
  }),
  declareSessionCommand(contextGraphShowSpec, {
    load: loadContextGraphShowSpec,
    requirements: CONTEXT_PROJECT_REQUIREMENTS,
    surface: "advanced",
  }),
  declareSessionCommand(contextGraphNeighborsSpec, {
    load: loadContextGraphNeighborsSpec,
    requirements: CONTEXT_PROJECT_REQUIREMENTS,
    surface: "advanced",
  }),
  declareSessionCommand(contextGraphValidateSpec, {
    load: loadContextGraphValidateSpec,
    requirements: CONTEXT_PROJECT_REQUIREMENTS,
    surface: "advanced",
  }),
  declareSessionCommand(contextGraphExportSpec, {
    load: loadContextGraphExportSpec,
    requirements: CONTEXT_PROJECT_REQUIREMENTS,
    surface: "advanced",
  }),
  declareSessionCommand(contextExtractionApplySpec, {
    load: loadContextExtractionApplySpec,
    requirements: CONTEXT_PROJECT_REQUIREMENTS,
    surface: "advanced",
  }),
  declareSessionCommand(contextCapabilitySpec, {
    load: loadContextCapabilityGroupSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
    surface: "advanced",
  }),
  declareSessionCommand(contextCapabilityValidateSpec, {
    load: loadContextCapabilityValidateSpec,
    requirements: CONTEXT_PROJECT_REQUIREMENTS,
    surface: "advanced",
  }),
  declareSessionCommand(contextCapabilitySearchSpec, {
    load: loadContextCapabilitySearchSpec,
    requirements: CONTEXT_PROJECT_REQUIREMENTS,
    surface: "advanced",
  }),
  declareSessionCommand(contextCapabilityDiscoverSpec, {
    load: loadContextCapabilityDiscoverSpec,
    requirements: CONTEXT_PROJECT_REQUIREMENTS,
    surface: "advanced",
  }),
] as const satisfies readonly CommandEntry[];
