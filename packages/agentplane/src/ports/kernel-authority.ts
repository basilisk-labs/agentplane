import type { SideEffectAuthorityConfig } from "@agentplaneorg/core/config";
import type { taskKernel as k } from "@agentplaneorg/core/tasks";

export type NativeAuthorityContext = Readonly<{
  task_id: string;
  task_revision: number;
  repository_identity: k.Sha256Digest;
  repository_fingerprint: k.Sha256Digest;
  actor: k.ActorIdentity;
  occurred_at: string;
  mutation_id: string;
  approval_receipts: SideEffectAuthorityConfig["approval_receipts"];
  ceiling: Pick<
    k.ExecutionAuthority,
    | "scope_roots"
    | "repository_effects"
    | "external_effects"
    | "capabilities"
    | "resources"
    | "validation_requirements"
    | "policy_digests"
    | "completion_requirements"
    | "risk"
    | "expires_at"
  >;
}>;

export type NativeApprovalObservation =
  | Readonly<{ kind: "manual_operator"; actor_id: string; invocation_id: string }>
  | Readonly<{ kind: "signed_user_receipt"; encoded: string }>
  | Readonly<{
      kind: "host_user_decision";
      repository_identity: k.Sha256Digest;
      encoded: string;
      host_id: string;
      conversation_id: string;
      message_id: string;
    }>;

/** The native controller implements this port. Never populate it from semantic agent output. */
export interface KernelAuthorityPort {
  readContext(taskId: string): Promise<NativeAuthorityContext>;
  /** Manual decisions come from an explicit operator invocation; host IDs come from its channel. */
  readApproval(taskId: string): Promise<NativeApprovalObservation | null>;
  /** Read the native change checkpoint, not an agent-reported list of paths. */
  observeContinuation(
    taskId: string,
    parent: k.ExecutionAuthority,
  ): Promise<k.AuthorityObservation | null>;
}
