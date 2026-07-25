import type { RouteOracle } from "./route-oracle.js";

export type RouteExecutionPacket = {
  schemaVersion: 1;
  actionKind: "local_command" | "provider_action" | "wait" | "stop";
  safeToMutate: boolean;
  requiresProviderAction: boolean;
  recommendedRole: "ORCHESTRATOR" | "CODER" | "TESTER" | "INTEGRATOR" | "EVALUATOR" | "USER";
  authoritativeCheckout: RouteOracle["authoritativeCheckout"];
  authoritativeCheckoutPath: string | null;
  mutationPathHint: string | null;
  mustRunFrom: string | null;
  exactArgv: string[] | null;
  mustNot: string[];
  returnControlWhen: string;
  humanProviderAction: string | null;
  staleStateCheck: string;
  evidenceMissing: string[];
  verificationCandidate: string | null;
  stopReason: string | null;
};
